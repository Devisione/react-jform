import { FormStateItemId, FormStateItems } from './shared';
import { FormValuesFieldPath } from '../../paths';

export type FormStateItemsIdsMap = Record<FormValuesFieldPath, FormStateItemId>;

export type FormStateItemsConfig = {
  items: FormStateItems;
  itemsIdsMap: FormStateItemsIdsMap;
};
