import { generateElementsConfig } from './generateElementsConfig';
import { generateFieldsConfig } from '../fields';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../../__mocks__';
import { ROOT_ID } from '../../../constants';
import { FormStateElementsConfig } from '../../../types';

describe('generateElementsConfig', function () {
  test('1 field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldSchema.fields,
      asRoot: true
    });

    expect(
      generateElementsConfig<OneFieldSchemaFieldsTemplate>(fieldsConfig)
    ).toEqual<FormStateElementsConfig>({
      [ROOT_ID.id]: {
        elements: [
          {
            field: fieldsConfig.some
          }
        ]
      }
    });
  });

  test('nested array field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: {
        others: {
          ...oneFieldArraySchema.fields.others,
          defaultValue: []
        }
      },
      asRoot: true
    });

    expect(
      generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig)
    ).toEqual<FormStateElementsConfig>({
      [ROOT_ID.id]: {
        elements: [
          {
            field: {
              defaultValue: fieldsConfig.others.defaultValue,
              fieldName: fieldsConfig.others.fieldName,
              validations: fieldsConfig.others.validations,
              type: fieldsConfig.others.type
            },
            elements: [
              {
                field: {
                  defaultValue: fieldsConfig.some.defaultValue,
                  fieldName: fieldsConfig.some.fieldName,
                  validations: fieldsConfig.some.validations,
                  type: fieldsConfig.some.type
                }
              }
            ]
          }
        ]
      }
    });
  });
});
