import { SchemaFieldName } from '../../schema';

export type FormStateElement = {
  field?: SchemaFieldName;
  elements?: FormStateElements;
};

export type FormStateElements = Array<FormStateElement>;
