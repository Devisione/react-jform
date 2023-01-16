import { Schema, SchemaFields, SchemaFieldTypes } from '../../types';

export type OneFieldArraySchemaFieldsTemplate = {
  others: {
    type: SchemaFieldTypes.array;
    fields: {
      some: {
        type: SchemaFieldTypes.number;
      };
    };
  };
};

const otherFieldFields: SchemaFields<OneFieldArraySchemaFieldsTemplate['others']['fields']> = {
  some: {
    type: 'number',
    defaultValue: 0,
    validations: {
      required: true
    }
  }
};

export const oneFieldArraySchema: Schema<OneFieldArraySchemaFieldsTemplate> = {
  fields: {
    others: {
      type: 'array',
      defaultValue: [{ some: otherFieldFields.some.defaultValue }],
      validations: {
        min: 1
      },
      fields: otherFieldFields
    }
  }
};
