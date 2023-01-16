import { FormStateItemsIdsMap, FormValuesFieldPath } from '../../../types';

export type SortItemsIdsMapProps = FormStateItemsIdsMap;
export type SortItemsIdsMapReturn = FormValuesFieldPath[];

export const sortItemsIdsMap = (itemsIdsMap: SortItemsIdsMapProps): SortItemsIdsMapReturn => {
  return (Object.keys(itemsIdsMap) as Array<keyof typeof itemsIdsMap>).sort((a, b) => {
    const aPathSlicesLength = a.split('.').length;
    const bPathSlicesLength = b.split('.').length;

    return aPathSlicesLength === bPathSlicesLength
      ? a > b
        ? 1
        : -1
      : aPathSlicesLength - bPathSlicesLength;
  });
};
