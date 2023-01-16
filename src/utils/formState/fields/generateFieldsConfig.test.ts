import { generateFieldsConfig } from './generateFieldsConfig';
import {
  oneFieldArraySchema,
  oneFieldSchema,
  OneFieldArraySchemaFieldsTemplate,
  OneFieldSchemaFieldsTemplate
} from '../../../__mocks__';
import { ROOT_ID } from '../../../constants';
import { FormStateFieldsConfig, FormStateFieldsTypes } from '../../../types';

describe('generateFieldsConfig', () => {
  test('1 field', () => {
    expect(
      generateFieldsConfig<OneFieldSchemaFieldsTemplate>({
        schemaFields: oneFieldSchema.fields,
        asRoot: true
      })
    ).toEqual<FormStateFieldsConfig<OneFieldSchemaFieldsTemplate>>({
      [ROOT_ID.id]: {
        fieldsConfigsNames: ['some']
      },
      some: {
        type: oneFieldSchema.fields.some.type,
        defaultValue: oneFieldSchema.fields.some.defaultValue,
        validations: oneFieldSchema.fields.some.validations,
        fieldName: 'some'
      }
    });
  });

  test('nested array field', () => {
    expect(
      generateFieldsConfig<OneFieldArraySchemaFieldsTemplate>({
        schemaFields: oneFieldArraySchema.fields,
        asRoot: true
      })
    ).toEqual<FormStateFieldsConfig<OneFieldArraySchemaFieldsTemplate>>({
      [ROOT_ID.id]: {
        fieldsConfigsNames: ['others']
      },
      others: {
        type: FormStateFieldsTypes.tuple,
        defaultValue: oneFieldArraySchema.fields.others.defaultValue,
        validations: oneFieldArraySchema.fields.others.validations,
        fieldsConfigsNames: ['some'],
        fieldName: 'others'
      },
      some: {
        type: oneFieldArraySchema.fields.others.fields.some.type,
        defaultValue: oneFieldArraySchema.fields.others.fields.some.defaultValue,
        validations: oneFieldArraySchema.fields.others.fields.some.validations,
        fieldName: 'some'
      }
    });
  });
});
