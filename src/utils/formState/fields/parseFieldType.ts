import {
  FormStateFieldsTypes,
  FormStateFieldType,
  SchemaFieldType,
  SchemaFieldTypes
} from '../../../types';

export const parseFieldType = <SFT extends SchemaFieldType>(
  schemaFieldType: SFT
): FormStateFieldType => {
  return schemaFieldType === SchemaFieldTypes.array
    ? FormStateFieldsTypes.tuple
    : FormStateFieldsTypes[schemaFieldType as FormStateFieldType];
};
