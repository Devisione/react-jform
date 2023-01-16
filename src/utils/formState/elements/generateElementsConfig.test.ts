import { generateElementsConfig } from './generateElementsConfig';
import { generateFieldsConfig } from '../fields/generateFieldsConfig';
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
            field: 'some'
          }
        ]
      }
    });
  });

  test('nested array field', () => {
    const fieldsConfig = generateFieldsConfig({
      schemaFields: oneFieldArraySchema.fields,
      asRoot: true
    });

    expect(
      generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig)
    ).toEqual<FormStateElementsConfig>({
      [ROOT_ID.id]: {
        elements: [
          {
            field: 'others',
            elements: [
              {
                field: 'some'
              }
            ]
          }
        ]
      }
    });
  });
});
