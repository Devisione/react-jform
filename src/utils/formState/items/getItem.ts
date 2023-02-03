import {
  FormStateItem,
  FormStateItemsConfig,
  FormValuesFieldPath,
  FormValuesFieldPathRuntype
} from '../../../types';

export type GetItemProps = {
  itemsConfig: FormStateItemsConfig;
  fieldPath: FormValuesFieldPath;
};

export type GetItemReturn = FormStateItem | undefined;

export const getItem = ({ itemsConfig, fieldPath }: GetItemProps): GetItemReturn => {
  const itemId = itemsConfig.itemsIdsMap[FormValuesFieldPathRuntype.check(fieldPath)];

  return itemsConfig.items[itemId];
};
