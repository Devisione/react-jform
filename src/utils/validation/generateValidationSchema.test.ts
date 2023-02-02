import { generateValidationSchema } from './generateValidationSchema';
import { generateElementsConfig, generateFieldsConfig, generateItemsConfig } from '../formState';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../__mocks__';
import * as yup from 'yup';

const checkIsValidSchema = (schema: yup.Schema, value: Record<string, any>) => {
  return schema.isValidSync(value, { strict: true });
};

describe('generateValidationSchema', () => {
  test('1 field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldSchema.fields,
      asRoot: true
    });
    const elementsConfig = generateElementsConfig<OneFieldSchemaFieldsTemplate>(fieldsConfig);
    const itemsConfig = generateItemsConfig<OneFieldSchemaFieldsTemplate>({
      elementsConfig,
      values: {
        some: 1
      }
    });

    const schema = generateValidationSchema(itemsConfig);

    expect(checkIsValidSchema(schema, { some: 1 })).toBeTruthy();
    expect(checkIsValidSchema(schema, {})).toBeFalsy();
  });

  test('nested array field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldArraySchema.fields,
      asRoot: true
    });
    const elementsConfig = generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig);
    const itemsConfig = generateItemsConfig<OneFieldArraySchemaFieldsTemplate>({
      elementsConfig,
      values: {
        others: [{ some: 1 }]
      }
    });

    const schema = generateValidationSchema(itemsConfig);

    expect(
      checkIsValidSchema(schema, {
        others: [{ some: 1 }]
      })
    ).toBeTruthy();
    expect(
      checkIsValidSchema(schema, {
        others: [{ some: '1' }]
      })
    ).toBeFalsy();
    expect(
      checkIsValidSchema(schema, {
        others: [1]
      })
    ).toBeFalsy();
    expect(
      checkIsValidSchema(schema, {
        others: 1
      })
    ).toBeFalsy();
  });
});
