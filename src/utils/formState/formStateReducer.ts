import {
  FormState,
  FormStateAction,
  FormStateActionTypes,
  FormStateItem,
  FormStateItems,
  FormValuesFieldPathRuntype,
  SchemaFieldsTemplate
} from '../../types';
import { generateFieldsConfig } from './fields';
import { generateElementsConfig } from './elements';
import { generateItemsConfig, getItem } from './items';
import { concatPaths, separatePath } from '../../helpers';
import { ROOT_ID } from '../../constants';
import { mergeDeep } from '../../helpers/mergeDeep';

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
    case FormStateActionTypes.addToArray: {
      const { value, fieldPath: newChildPath } = action.payload;
      const { tail: arrayPath, head: rawNewChildIndex } = separatePath(newChildPath);
      const newChildIndex = parseInt(rawNewChildIndex, 10);
      const arrayItem = getItem({ itemsConfig: state.itemsConfig, fieldPath: arrayPath });

      if (!arrayItem?.itemsTemplate || Number.isNaN(newChildIndex)) {
        return state;
      }

      const { items: dirtyNewChildItems, itemsIdsMap: dirtyNewChildItemsIdsMap } =
        generateItemsConfig<SchemaFieldsTemplate>({
          elementsConfig: {
            [ROOT_ID.id]: {
              elements: [{ elements: arrayItem.itemsTemplate }]
            }
          },
          parentFieldPath: newChildPath,
          values: value
        });
      const { [ROOT_ID.id]: newChildItemsRoot, ...newChildItems } = dirtyNewChildItems;
      const newChildId = newChildItemsRoot.itemsIds![0];

      const newChildItemsIdsMap = {
        ...dirtyNewChildItemsIdsMap,
        [newChildPath]: newChildId
      };

      const updatedArrayItem = { ...arrayItem };

      if (arrayItem.itemsIds?.length) {
        updatedArrayItem.itemsIds = [...updatedArrayItem.itemsIds!];
        updatedArrayItem.itemsIds.splice(newChildIndex, 0, newChildId);
      } else {
        updatedArrayItem.itemsIds = [newChildId];
      }

      const arrayId = state.itemsConfig.itemsIdsMap[arrayPath];

      const offsetStartIndex = newChildIndex;
      const itemsIdsMapWithOffset = Object.fromEntries(
        Object.entries(state.itemsConfig.itemsIdsMap).map(([fieldPath, itemId]) => {
          if (!fieldPath.startsWith(arrayPath) || fieldPath === arrayPath) {
            return [fieldPath, itemId];
          } else {
            const arrayIndexPathPartIndex = arrayPath.split('.').length;
            const rawArrayChildIndex = FormValuesFieldPathRuntype.check(
              fieldPath.split('.')[arrayIndexPathPartIndex]
            );
            const arrayChildIndex = parseInt(rawArrayChildIndex, 10);

            let arrayChildIndexWithOffset = arrayChildIndex;
            if (arrayChildIndex >= offsetStartIndex) {
              arrayChildIndexWithOffset = arrayChildIndexWithOffset + 1;
            }

            const arrayChildPath = concatPaths(arrayPath, rawArrayChildIndex);
            const arrayChildPathWithOffset = concatPaths(
              arrayPath,
              FormValuesFieldPathRuntype.check(arrayChildIndexWithOffset.toString())
            );

            return [fieldPath.replace(arrayChildPath, arrayChildPathWithOffset), itemId];
          }
        })
      );

      return {
        ...state,
        itemsConfig: {
          items: {
            ...state.itemsConfig.items,
            [arrayId]: updatedArrayItem,
            ...newChildItems
          },
          itemsIdsMap: {
            ...itemsIdsMapWithOffset,
            ...newChildItemsIdsMap
          }
        }
      };
    }
    case FormStateActionTypes.appendToArray: {
      const { fieldPath: arrayPath, value } = action.payload;
      const arrayItem = getItem({ itemsConfig: state.itemsConfig, fieldPath: arrayPath });

      if (!arrayItem?.itemsTemplate) {
        return state;
      }

      const newChildIndex = FormValuesFieldPathRuntype.check(
        arrayItem.itemsIds?.length?.toString() || '0'
      );
      const newChildPath = concatPaths(arrayPath, newChildIndex);

      return formStateReducer(state, {
        type: FormStateActionTypes.addToArray,
        payload: {
          value,
          fieldPath: newChildPath
        }
      });
    }
    case FormStateActionTypes.prependToArray: {
      const { fieldPath: arrayPath, value } = action.payload;
      const newChildPath = concatPaths(arrayPath, FormValuesFieldPathRuntype.check('0'));

      return formStateReducer(state, {
        type: FormStateActionTypes.addToArray,
        payload: {
          value,
          fieldPath: newChildPath
        }
      });
    }
    case FormStateActionTypes.removeItem: {
      const itemToRemoveFieldPath = action.payload.fieldPath;
      const itemToRemove = getItem({
        itemsConfig: state.itemsConfig,
        fieldPath: itemToRemoveFieldPath
      });

      if (!itemToRemove) {
        return state;
      }

      const remainingItemsIdsMap = Object.fromEntries(
        Object.entries(state.itemsConfig.itemsIdsMap).filter(
          ([fieldPath]) => !fieldPath.startsWith(itemToRemoveFieldPath)
        )
      );
      const remainingItemsIds = Object.values(remainingItemsIdsMap);
      const remainingItems = Object.fromEntries(
        Object.entries(state.itemsConfig.items).filter(([itemId]) =>
          remainingItemsIds.includes(itemId)
        )
      ) as FormStateItems;

      const itemToRemoveParentPath = separatePath(itemToRemoveFieldPath).tail;
      const itemToRemoveParent = getItem({
        itemsConfig: {
          items: remainingItems,
          itemsIdsMap: remainingItemsIdsMap
        },
        fieldPath: itemToRemoveParentPath
      });

      if (itemToRemoveParent && remainingItems[itemToRemoveParent.id].itemsIds) {
        remainingItems[itemToRemoveParent.id].itemsIds = remainingItems[
          itemToRemoveParent.id
        ].itemsIds!.filter(itemId => itemId !== itemToRemove.id);
      }

      return {
        ...state,
        itemsConfig: {
          items: remainingItems,
          itemsIdsMap: remainingItemsIdsMap
        }
      };
    }
    case FormStateActionTypes.updateItem: {
      const { fieldPath, updateData } = action.payload;

      const item = getItem({
        itemsConfig: state.itemsConfig,
        fieldPath: fieldPath
      });

      if (!item) {
        return state;
      }

      const updatedItem = mergeDeep(item, updateData) as FormStateItem;

      return {
        ...state,
        itemsConfig: {
          ...state.itemsConfig,
          items: {
            ...state.itemsConfig.items,
            [updatedItem.id]: updatedItem
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
