import {
  SchemaField,
  SchemaFieldNestedTemplate,
  SchemaFieldPrimitiveTemplate,
  SchemaFieldTemplate
} from '../schema';

export type GetTemplateFromField<SF extends SchemaField<SchemaFieldTemplate>> =
  SF['type'] extends `${SchemaFieldNestedTemplate['type']}`
    ? SchemaFieldNestedTemplate
    : SchemaFieldPrimitiveTemplate;
