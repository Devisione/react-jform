import {
  FormStateItem,
  FormStateItemsConfig,
  FormValuesFieldPath,
  FormValuesFieldPathRuntype
} from '../../../types';

export type GetItemProps = {
  itemsConfig: FormStateItemsConfig;
  itemPath: FormValuesFieldPath;
};

export type GetItemReturn = FormStateItem | undefined;

export const getItem = ({ itemsConfig, itemPath }: GetItemProps): GetItemReturn => {
  const itemId = itemsConfig.itemsIdsMap[FormValuesFieldPathRuntype.check(itemPath)];

  return itemsConfig.items[itemId];
};
