import {
  FormState,
  FormStateAction,
  FormStateActionTypes,
  FormValuesFieldPathRuntype,
  SchemaFieldsTemplate
} from '../../types';
import { generateFieldsConfig } from './fields';
import { generateElementsConfig } from './elements';
import { generateItemsConfig, getItem } from './items';
import { concatPaths } from '../../helpers';
import { ROOT_ID } from '../../constants';

export const defaultFormState: FormState = {
  itemsConfig: {
    items: {},
    itemsIdsMap: {}
  }
};

export const formStateReducer = <SFT extends SchemaFieldsTemplate>(
  state: FormState,
  action: FormStateAction<SFT>
): FormState => {
  switch (action.type) {
    case FormStateActionTypes.uploadSchema: {
      const { schema } = action.payload;

      const fieldsConfig = generateFieldsConfig<SFT>({
        schemaFields: schema.fields,
        asRoot: true
      });
      const elementsConfig = generateElementsConfig<SFT>(fieldsConfig);
      // TODO: add default values
      const itemsConfig = generateItemsConfig<SFT>({ elementsConfig, values: {} });

      return {
        ...formStateReducer<SFT>(state, { type: FormStateActionTypes.reset }),
        itemsConfig
      };
    }
    case FormStateActionTypes.appendToArray: {
      const { value, fieldPath: arrayFieldPath } = action.payload;
      const arrayItem = getItem({ itemsConfig: state.itemsConfig, fieldPath: arrayFieldPath });

      if (!arrayItem?.itemsTemplate) {
        return state;
      }

      const newChildIndex = FormValuesFieldPathRuntype.check(
        arrayItem.itemsIds?.length?.toString() || '0'
      );
      const newChildPath = concatPaths(arrayFieldPath, newChildIndex);

      const { items: dirtyChildrenItems, itemsIdsMap: dirtyChildrenItemsIdsMap } =
        generateItemsConfig<SchemaFieldsTemplate>({
          elementsConfig: {
            [ROOT_ID.id]: {
              elements: [{ elements: arrayItem.itemsTemplate }]
            }
          },
          parentFieldPath: newChildPath,
          values: value
        });
      const { [ROOT_ID.id]: childrenRoot, ...childrenItems } = dirtyChildrenItems;
      const newChildId = childrenRoot.itemsIds![0];
      const childrenItemsIdsMap = {
        ...dirtyChildrenItemsIdsMap,
        [newChildPath]: newChildId
      };

      const updatedArrayItem = { ...arrayItem };

      if (arrayItem.itemsIds?.length) {
        updatedArrayItem.itemsIds = [...updatedArrayItem.itemsIds!, newChildId];
      } else {
        updatedArrayItem.itemsIds = [newChildId];
      }

      const arrayId = state.itemsConfig.itemsIdsMap[arrayFieldPath];

      return {
        ...state,
        itemsConfig: {
          items: {
            ...state.itemsConfig.items,
            [arrayId]: updatedArrayItem,
            ...childrenItems
          },
          itemsIdsMap: {
            ...state.itemsConfig.itemsIdsMap,
            ...childrenItemsIdsMap
          }
        }
      };
    }
    case FormStateActionTypes.reset: {
      return defaultFormState;
    }
    default: {
      return state;
    }
  }
};
