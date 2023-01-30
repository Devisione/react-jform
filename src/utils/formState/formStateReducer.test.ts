import { formStateReducer } from './formStateReducer';
import { FormState, FormStateActionTypes, FormValuesFieldPathRuntype } from '../../types';
import { generateItemsConfig } from './items';
import { oneFieldArraySchema, OneFieldArraySchemaFieldsTemplate } from '../../__mocks__';
import { generateFieldsConfig } from './fields';
import { generateElementsConfig } from './elements';

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

describe('formStateReducer', () => {
  describe('append to array', () => {
    beforeEach(async () => {
      const uuid = await import('uuid');
      // @ts-ignore
      uuid.clearIncrementor();
    });

    test('', () => {
      const fieldsConfig = generateFieldsConfig<OneFieldArraySchemaFieldsTemplate>({
        schemaFields: oneFieldArraySchema.fields,
        asRoot: true
      });
      const elementsConfig =
        generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig);

      const state: FormState = {
        itemsConfig: generateItemsConfig({
          elementsConfig,
          parentFieldPath: FormValuesFieldPathRuntype.check(''),
          values: {
            others: [{ some: 1 }]
          }
        })
      };

      expect(
        formStateReducer(state, {
          type: FormStateActionTypes.appendToArray,
          payload: {
            fieldPath: FormValuesFieldPathRuntype.check('others'),
            value: { some: 2 }
          }
        })
      ).toEqual({
        ...state,
        itemsConfig: {
          ...state.itemsConfig,
          items: {
            ...state.itemsConfig.items,
            others0: {
              ...state.itemsConfig.items.others0,
              itemsIds: ['1', '3']
            },
            '3': {
              id: '3',
              itemsIds: ['some4']
            },
            some4: {
              id: 'some4',
              dataState: {
                fieldName: 'some',
                type: oneFieldArraySchema.fields.others.fields.some.type,
                validations: oneFieldArraySchema.fields.others.fields.some.validations,
                defaultValue: oneFieldArraySchema.fields.others.fields.some.defaultValue
              }
            }
          },
          itemsIdsMap: {
            ...state.itemsConfig.itemsIdsMap,
            [FormValuesFieldPathRuntype.check('others.1')]: '3',
            [FormValuesFieldPathRuntype.check('others.1.some')]: 'some4'
          }
        }
      });
    });
  });
});
