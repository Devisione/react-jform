import {
  SchemaFieldArrayTemplate,
  SchemaFieldPrimitiveTemplate,
  SchemaFieldNestedTemplate,
  SchemaFieldsTemplate,
  SchemaFieldTemplate,
  SchemaFieldTypes
} from './schema';

export type FormValueType = string | number | boolean | Array<any> | undefined;

export type FormArrayValues<SFT extends SchemaFieldArrayTemplate> = Array<
  FormValues<SFT['fields']>
>;

export type FormValue<SFT extends SchemaFieldTemplate> = SFT extends SchemaFieldPrimitiveTemplate
  ? SFT extends { type: SchemaFieldTypes.string }
    ? string
    : SFT extends { type: SchemaFieldTypes.number }
    ? number
    : SFT extends { type: SchemaFieldTypes.boolean }
    ? boolean
    : never
  : SFT extends SchemaFieldNestedTemplate
  ? SFT extends SchemaFieldArrayTemplate
    ? FormArrayValues<SFT>
    : never
  : never;

export type FormValues<SFT extends SchemaFieldsTemplate> = {
  [Key in keyof SFT]: FormValue<SFT[Key]>;
};
