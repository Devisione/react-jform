import { FormStateFieldConfig } from '../fields';
import { SchemaField, SchemaFieldTemplate } from '../../schema';

export type FormStateElement = {
  field?: Omit<
    FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>,
    'fieldsConfigsNames'
  >;
  elements?: FormStateElements;
};

export type FormStateElements = Array<FormStateElement>;
