import { SchemaField, SchemaFieldName, SchemaFieldTemplate } from '../schema';
import { FormStateFieldConfig, FormStateItemDataState } from '../formState';

export type ValidationFieldConfig = Omit<
  FormStateItemDataState<
    FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
  >,
  'fieldName'
> & {
  items?: ValidationConfig[];
};

export type ValidationConfig = Record<SchemaFieldName, ValidationFieldConfig>;
