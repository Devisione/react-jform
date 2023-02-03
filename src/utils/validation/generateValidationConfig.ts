import { getItem } from '../formState';
import { FormStateItemsConfig, FormValuesFieldPathRuntype } from '../../types';
import { formatPathAddItems } from '../../helpers/formatPathAddItems';
import { getByPath, setByPath } from '../../helpers';
import mergeDeep from 'deepmerge';
import { ValidationConfig } from '../../types/validation/shared';

export type GenerateValidationConfigProps = FormStateItemsConfig;

export type GenerateValidationConfigReturn = ValidationConfig;

export const generateValidationConfig = (
  itemsConfig: GenerateValidationConfigProps
): GenerateValidationConfigReturn => {
  return Object.keys(itemsConfig.itemsIdsMap).reduce((validationConfig, fieldPath) => {
    const item = getItem({
      itemsConfig,
      fieldPath: FormValuesFieldPathRuntype.check(fieldPath)
    });

    const pathWithItems = formatPathAddItems(fieldPath);
    const validationItem = item?.dataState
      ? {
          validations: item?.dataState?.validations,
          type: item?.dataState?.type,
          defaultValue: item?.dataState?.defaultValue
        }
      : {};
    setByPath(
      validationConfig,
      pathWithItems,
      mergeDeep(getByPath(validationConfig, pathWithItems) || {}, validationItem)
    );

    return validationConfig;
  }, {} as ValidationConfig);
};
