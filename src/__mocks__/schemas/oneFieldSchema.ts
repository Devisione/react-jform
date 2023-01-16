import { Schema, SchemaFieldTypes } from '../../types';

export type OneFieldSchemaFieldsTemplate = {
  some: {
    type: SchemaFieldTypes.number;
  };
};

export const oneFieldSchema: Schema<OneFieldSchemaFieldsTemplate> = {
  fields: {
    some: {
      type: 'number',
      defaultValue: 0,
      validations: {
        required: true
      }
    }
  }
};
