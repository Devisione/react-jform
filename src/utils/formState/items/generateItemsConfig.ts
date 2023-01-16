import { uuid as createUUIDV4 } from "uuidv4";
import {
  FormStateItemId,
  FormStateItem,
  FormValuesFieldPathRuntype,
  FormValuesFieldPath,
  FormStateFieldsConfig,
  SchemaFieldsTemplate,
  FormStateElementsConfig,
  FormStateItemsConfig,
  FormStateElement,
  FormStateFieldsTypes,
  FormValue,
  SchemaFieldArrayTemplate
} from '../../../types';
import { parseItemDataState } from './parseItemDataState';
import { ROOT_ID } from '../../../constants';
import { concatPaths } from '../../paths';

export type GenerateItemsConfigProps<SFT extends SchemaFieldsTemplate> = {
  fieldsConfig: FormStateFieldsConfig<SFT>;
  elementsConfig: FormStateElementsConfig;
  parentFieldPath?: FormValuesFieldPath;
};

export type GenerateItemsConfigReturn = FormStateItemsConfig;

type GenerateItemConfigProps = {
  element: FormStateElement;
  asRoot?: boolean;
  parentFieldPath: FormValuesFieldPath;
};

export const generateItemsConfig = <SFT extends SchemaFieldsTemplate>({
  elementsConfig,
  fieldsConfig,
  parentFieldPath = FormValuesFieldPathRuntype.check('')
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
    const id: FormStateItemId = asRoot ? ROOT_ID.id : `${element?.field || ''}${createUUIDV4()}`;

    const item = { id } as FormStateItem;

    const fieldPath = element.field
      ? FormValuesFieldPathRuntype.check(concatPaths(parentFieldPath, element.field))
      : parentFieldPath;

    const { field: fieldName, elements: childrenElements } = element;

    if (fieldName) {
      const fieldConfig = fieldsConfig[fieldName];

      if (fieldConfig.type === FormStateFieldsTypes.tuple) {
        item.itemsTemplate = element.elements;
      }

      item.dataState = parseItemDataState(fieldConfig);
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
        (item.dataState.value as FormValue<SchemaFieldArrayTemplate> | undefined)?.forEach(
          (_, index) => {
            const childParentFieldPath = FormValuesFieldPathRuntype.check(
              concatPaths(fieldPath, index.toString())
            );

            generateChild(
              {
                elements: children
              },
              childParentFieldPath
            );
          }
        );
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
