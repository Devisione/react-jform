import { Schema, SchemaFieldTypes } from '../../types';

export type TwoFieldsDepsArraySchemaFieldsTemplate = {
  items: {
    type: SchemaFieldTypes.array;
    fields: {
      first: {
        type: SchemaFieldTypes.string;
      };
      second: {
        type: SchemaFieldTypes.string;
      };
    };
  };
};

export const twoFieldsDepsArraySchema: Schema<TwoFieldsDepsArraySchemaFieldsTemplate> = {
  fields: {
    items: {
      type: 'array',
      fields: {
        first: {
          type: 'string',
          validations: {
            required: true,
            oneOf: ['a', 'b', 'c']
          }
        },
        second: {
          type: 'string'
        }
      }
    }
  },
  conditions: {
    second: [
      {
        watchedField: 'first',
        rules: [
          {
            is: 'a',
            then: {
              defaultValue: 'a1',
              value: 'a1',
              validations: {
                oneOf: ['a1', 'a2', 'a3']
              }
            }
          },
          {
            is: 'b',
            then: {
              defaultValue: 'b1',
              value: 'b1',
              validations: {
                oneOf: ['b1', 'b2', 'b3']
              }
            }
          },
          {
            is: 'c',
            then: {
              defaultValue: 'c1',
              value: 'c1',
              validations: {
                oneOf: ['c1', 'c2', 'c3']
              }
            }
          }
        ]
      }
    ]
  }
};
