import { FormStateFormattedItem, FormStateItem } from '../../../types';

export type FormatItemProps = FormStateItem;

export type FormatItemReturn = FormStateFormattedItem;

export const formatItem = (item: FormatItemProps): FormatItemReturn => {
  return {
    id: item.id,
    field: item.dataState?.fieldName,
    dataType: item.dataState?.type,
    validations: item.dataState?.validations
  };
};
