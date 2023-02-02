import {
  generateElementsConfig,
  generateFieldsConfig,
  generateItemsConfig,
  parseFieldType
} from '../formState';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../__mocks__';
import { generateValidationConfig } from './generateValidationConfig';

describe('generateValidationConfig', () => {
  test('flat field', () => {
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

    expect(generateValidationConfig(itemsConfig)).toEqual({
      some: {
        type: oneFieldSchema.fields.some.type,
        validations: oneFieldSchema.fields.some.validations,
        defaultValue: oneFieldSchema.fields.some.defaultValue
      }
    });
  });
  test('array field', () => {
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

    expect(generateValidationConfig(itemsConfig)).toEqual({
      others: {
        type: parseFieldType(oneFieldArraySchema.fields.others.type),
        validations: oneFieldArraySchema.fields.others.validations,
        defaultValue: oneFieldArraySchema.fields.others.defaultValue,
        items: [
          {
            some: {
              type: oneFieldArraySchema.fields.others.fields.some.type,
              validations: oneFieldArraySchema.fields.others.fields.some.validations,
              defaultValue: oneFieldArraySchema.fields.others.fields.some.defaultValue
            }
          }
        ]
      }
    });
  });
});
