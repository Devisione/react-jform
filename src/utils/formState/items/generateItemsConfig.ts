import { v4 as createUUIDV4 } from 'uuid';
import {
  FormStateItemId,
  FormStateItem,
  FormValuesFieldPathRuntype,
  FormValuesFieldPath,
  FormStateElementsConfig,
  FormStateItemsConfig,
  FormStateElement,
  FormStateFieldsTypes,
  FormValue,
  SchemaFieldArrayTemplate,
  SchemaFieldsTemplate,
  FormValues
} from '../../../types';
import { parseItemDataState } from './parseItemDataState';
import { ROOT_ID } from '../../../constants';
import { concatPaths } from '../../paths';
import { getByPath } from '../../../helpers';

export type GenerateItemsConfigProps<SFT extends SchemaFieldsTemplate> = {
  elementsConfig: FormStateElementsConfig;
  parentFieldPath?: FormValuesFieldPath;
  values: Partial<FormValues<SFT>>;
};

export type GenerateItemsConfigReturn = FormStateItemsConfig;

type GenerateItemConfigProps = {
  element: FormStateElement;
  asRoot?: boolean;
  parentFieldPath: FormValuesFieldPath;
};

export const generateItemsConfig = <SFT extends SchemaFieldsTemplate>({
  elementsConfig,
  parentFieldPath = FormValuesFieldPathRuntype.check(''),
  values
}: GenerateItemsConfigProps<SFT>): GenerateItemsConfigReturn => {
  const itemsConfig: FormStateItemsConfig = {
    items: {},
    itemsIdsMap: {}
  };

  const generateItemConfig = ({
    element,
    asRoot = false,
    parentFieldPath
  }: GenerateItemConfigProps) => {
    const id: FormStateItemId = asRoot
      ? ROOT_ID.id
      : `${element?.field?.fieldName || ''}${createUUIDV4()}`;

    const item = { id } as FormStateItem;

    const fieldPath = element.field
      ? FormValuesFieldPathRuntype.check(concatPaths(parentFieldPath, element.field.fieldName))
      : parentFieldPath;
    const fieldValue = element.field ? getByPath(values, fieldPath) : undefined;

    const { field, elements: childrenElements } = element;

    if (field) {
      if (field.type === FormStateFieldsTypes.tuple) {
        item.itemsTemplate = element.elements;
      }

      item.dataState = parseItemDataState(field);
    }

    if (childrenElements) {
      const generateChild = (
        child: FormStateElement,
        childParentFieldPath: FormValuesFieldPath
      ) => {
        const childItemId = generateItemConfig({
          element: child,
          parentFieldPath: childParentFieldPath
        });

        if (!item.itemsIds) {
          item.itemsIds = [];
        }

        item.itemsIds.push(childItemId);
      };
      const children = Array.isArray(childrenElements) ? childrenElements : [childrenElements];

      if (item.dataState?.type === FormStateFieldsTypes.tuple) {
        (fieldValue as FormValue<SchemaFieldArrayTemplate> | undefined)?.forEach((_, index) => {
          const childParentFieldPath = FormValuesFieldPathRuntype.check(
            concatPaths(fieldPath, index.toString())
          );

          generateChild(
            {
              elements: children
            },
            childParentFieldPath
          );
        });
      } else {
        children.forEach(child => {
          generateChild(child, fieldPath);
        });
      }
    }

    itemsConfig.items[id] = item;
    itemsConfig.itemsIdsMap[fieldPath] = id;

    return id;
  };

  generateItemConfig({
    element: elementsConfig[ROOT_ID.id],
    asRoot: true,
    parentFieldPath
  });

  return itemsConfig;
};
