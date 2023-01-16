import { SchemaFieldString } from './string';
import { SchemaFieldNumber } from './number';
import { SchemaFieldBoolean } from './boolean';
import { SchemaFieldArray } from './array';

export enum SchemaFieldTypes {
  'string' = 'string',
  'number' = 'number',
  'boolean' = 'boolean',
  'array' = 'array'
}

export type SchemaFieldType = `${SchemaFieldTypes}`;

export type SchemaFieldName = string;

export type SchemaFieldPrimitiveTemplate =
  | {
      type: SchemaFieldTypes.string;
    }
  | {
      type: SchemaFieldTypes.number;
    }
  | {
      type: SchemaFieldTypes.boolean;
    };

export type SchemaFieldArrayTemplate = {
  type: SchemaFieldTypes.array;
  fields: SchemaFieldsTemplate;
};

export type SchemaFieldNestedTemplate = SchemaFieldArrayTemplate;

export type SchemaFieldTemplate = SchemaFieldPrimitiveTemplate | SchemaFieldNestedTemplate;

export type SchemaFieldsTemplate = Record<SchemaFieldName, SchemaFieldTemplate>;

export type SchemaField<SFT extends SchemaFieldTemplate> = SFT extends SchemaFieldPrimitiveTemplate
  ? SFT extends { type: SchemaFieldTypes.string }
    ? SchemaFieldString
    : SFT extends { type: SchemaFieldTypes.number }
    ? SchemaFieldNumber
    : SFT extends { type: SchemaFieldTypes.boolean }
    ? SchemaFieldBoolean
    : never
  : SFT extends SchemaFieldNestedTemplate
  ? SFT extends SchemaFieldArrayTemplate
    ? SchemaFieldArray<SFT>
    : never
  : never;

export type SchemaFields<SFT extends SchemaFieldsTemplate> = {
  [Key in keyof SFT]: SchemaField<SFT[Key]>;
};
