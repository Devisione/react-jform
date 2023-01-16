import {
  FormStateFieldConfig,
  FormStateFieldsTypes,
  SchemaField,
  SchemaFieldName,
  SchemaFieldTemplate,
  SchemaFieldTypes
} from '../../../types';
import { parseFieldType } from './parseFieldType';

export const parseFieldConfig = <SFT extends SchemaFieldTemplate, SF extends SchemaField<SFT>>(
  schemaFieldName: SchemaFieldName,
  schemaField: SF
): FormStateFieldConfig<SFT, SF> => {
  let fieldConfig: FormStateFieldConfig<SFT, SF> = {
    fieldName: schemaFieldName,
    type: parseFieldType(schemaField.type)
  } as FormStateFieldConfig<SFT, SF>;

  if (Reflect.has(schemaField, 'defaultValue')) {
    fieldConfig.defaultValue = schemaField.defaultValue;
  }

  if (Reflect.has(schemaField, 'validations')) {
    fieldConfig.validations = schemaField.validations;
  }

  if (
    fieldConfig.type === FormStateFieldsTypes.tuple &&
    schemaField.type === SchemaFieldTypes.array
  ) {
    // @ts-ignore
    fieldConfig.fieldsConfigsNames = Object.keys(schemaField.fields);
  }

  return fieldConfig;
};
