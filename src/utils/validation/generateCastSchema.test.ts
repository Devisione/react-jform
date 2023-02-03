import { generateFieldsConfig } from '../formState';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../__mocks__';
import { generateCastSchema } from './generateCastSchema';

describe('generateCastSchema', () => {
  test('1 field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldSchema.fields,
      asRoot: true
    });

    expect(generateCastSchema<OneFieldSchemaFieldsTemplate>(fieldsConfig).cast({})).toEqual({
      some: oneFieldSchema.fields.some.defaultValue
    });
  });

  test('nested array field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldArraySchema.fields,
      asRoot: true
    });

    expect(generateCastSchema<OneFieldArraySchemaFieldsTemplate>(fieldsConfig).cast({})).toEqual({
      others: oneFieldArraySchema.fields.others.defaultValue
    });
  });
});
