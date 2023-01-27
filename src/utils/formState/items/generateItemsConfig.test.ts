import { generateItemsConfig } from './generateItemsConfig';
import { generateElementsConfig } from '../elements';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../../__mocks__';
import { generateFieldsConfig, parseFieldType } from '../fields';
import { FormStateItemsConfig, FormValuesFieldPathRuntype } from '../../../types';
import { ROOT_ID } from '../../../constants';

jest.mock('uuid', () => {
  let i = 0;
  const originalModule = jest.requireActual('uuid');

  return {
    __esModule: true,
    ...originalModule,
    v4: jest.fn().mockImplementation(() => (i++).toString()),
    clearIncrementor: () => (i = 0)
  };
});

describe('generateItemsConfig', () => {
  beforeEach(async () => {
    const uuid = await import('uuid');
    // @ts-ignore
    uuid.clearIncrementor();
  });

  test('1 field', () => {
    const fieldsConfig = generateFieldsConfig<OneFieldSchemaFieldsTemplate>({
      schemaFields: oneFieldSchema.fields,
      asRoot: true
    });
    const elementsConfig = generateElementsConfig<OneFieldSchemaFieldsTemplate>(fieldsConfig);

    expect(
      generateItemsConfig({
        elementsConfig,
        parentFieldPath: FormValuesFieldPathRuntype.check('')
      })
    ).toEqual<FormStateItemsConfig>({
      items: {
        [ROOT_ID.id]: {
          id: ROOT_ID.id,
          itemsIds: ['some0']
        },
        some0: {
          id: 'some0',
          dataState: {
            fieldName: 'some',
            type: oneFieldSchema.fields.some.type,
            validations: oneFieldSchema.fields.some.validations,
            value: oneFieldSchema.fields.some.defaultValue,
            defaultValue: oneFieldSchema.fields.some.defaultValue
          }
        }
      },
      itemsIdsMap: {
        [FormValuesFieldPathRuntype.check('')]: ROOT_ID.id,
        [FormValuesFieldPathRuntype.check('some')]: 'some0'
      }
    });
  });

  test('nested array field', () => {
    const fieldsConfig = generateFieldsConfig<OneFieldArraySchemaFieldsTemplate>({
      schemaFields: oneFieldArraySchema.fields,
      asRoot: true
    });
    const elementsConfig = generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig);

    expect(
      generateItemsConfig({
        elementsConfig,
        parentFieldPath: FormValuesFieldPathRuntype.check('')
      })
    ).toEqual<FormStateItemsConfig>({
      items: {
        [ROOT_ID.id]: {
          id: ROOT_ID.id,
          itemsIds: ['others0']
        },
        others0: {
          id: 'others0',
          itemsIds: ['1'],
          dataState: {
            fieldName: 'others',
            type: parseFieldType(oneFieldArraySchema.fields.others.type),
            validations: oneFieldArraySchema.fields.others.validations,
            defaultValue: oneFieldArraySchema.fields.others.defaultValue,
            value: oneFieldArraySchema.fields.others.defaultValue
          },
          itemsTemplate: elementsConfig[ROOT_ID.id].elements[0].elements
        },
        '1': {
          id: '1',
          itemsIds: ['some2']
        },
        some2: {
          id: 'some2',
          dataState: {
            fieldName: 'some',
            type: oneFieldArraySchema.fields.others.fields.some.type,
            validations: oneFieldArraySchema.fields.others.fields.some.validations,
            defaultValue: oneFieldArraySchema.fields.others.fields.some.defaultValue,
            value: oneFieldArraySchema.fields.others.fields.some.defaultValue
          }
        }
      },
      itemsIdsMap: {
        [FormValuesFieldPathRuntype.check('')]: ROOT_ID.id,
        [FormValuesFieldPathRuntype.check('others')]: 'others0',
        [FormValuesFieldPathRuntype.check('others.0')]: '1',
        [FormValuesFieldPathRuntype.check('others.0.some')]: 'some2'
      }
    });
  });
});

export {};
