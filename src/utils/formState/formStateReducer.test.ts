import { formStateReducer } from './formStateReducer';
import { FormState, FormStateActionTypes, FormValuesFieldPathRuntype } from '../../types';
import { generateItemsConfig } from './items';
import {
  oneFieldArraySchema,
  OneFieldArraySchemaFieldsTemplate,
  oneFieldSchema,
  OneFieldSchemaFieldsTemplate
} from '../../__mocks__';
import { generateFieldsConfig } from './fields';
import { generateElementsConfig } from './elements';
import { ROOT_ID } from '../../constants';

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

const generateOneFieldState = () => {
  const fieldsConfig = generateFieldsConfig<OneFieldSchemaFieldsTemplate>({
    schemaFields: oneFieldSchema.fields,
    asRoot: true
  });
  const elementsConfig = generateElementsConfig<OneFieldSchemaFieldsTemplate>(fieldsConfig);

  const state: FormState = {
    itemsConfig: generateItemsConfig({
      elementsConfig,
      parentFieldPath: FormValuesFieldPathRuntype.check(''),
      values: {
        some: 1
      }
    })
  };

  return state;
};

const generateOneFieldArrayState = () => {
  const fieldsConfig = generateFieldsConfig<OneFieldArraySchemaFieldsTemplate>({
    schemaFields: oneFieldArraySchema.fields,
    asRoot: true
  });
  const elementsConfig = generateElementsConfig<OneFieldArraySchemaFieldsTemplate>(fieldsConfig);

  const state: FormState = {
    itemsConfig: generateItemsConfig({
      elementsConfig,
      parentFieldPath: FormValuesFieldPathRuntype.check(''),
      values: {
        others: [{ some: 1 }]
      }
    })
  };

  return state;
};

describe('formStateReducer', () => {
  beforeEach(async () => {
    const uuid = await import('uuid');
    // @ts-ignore
    uuid.clearIncrementor();
  });
  describe('prepend to array', () => {
    test('', () => {
      const state = generateOneFieldArrayState();

      expect(
        formStateReducer(state, {
          type: FormStateActionTypes.prependToArray,
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
              itemsIds: ['3', '1']
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
            [FormValuesFieldPathRuntype.check('others.0')]: '3',
            [FormValuesFieldPathRuntype.check('others.0.some')]: 'some4',
            [FormValuesFieldPathRuntype.check('others.1')]: '1',
            [FormValuesFieldPathRuntype.check('others.1.some')]: 'some2'
          }
        }
      });
    });
  });
  describe('append to array', () => {
    test('', () => {
      const state = generateOneFieldArrayState();

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
  describe('update in array', () => {
    test('', () => {
      const state = generateOneFieldArrayState();

      expect(
        formStateReducer(state, {
          type: FormStateActionTypes.updateInArray,
          payload: {
            fieldPath: FormValuesFieldPathRuntype.check('others.0'),
            value: { some: 2 }
          }
        })
      ).toEqual({
        ...state,
        itemsConfig: {
          ...state.itemsConfig,
          items: {
            [ROOT_ID.id]: {
              id: ROOT_ID.id,
              itemsIds: ['others0']
            },
            others0: {
              ...state.itemsConfig.items.others0,
              itemsIds: ['3']
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
            [FormValuesFieldPathRuntype.check('others.0')]: '3',
            [FormValuesFieldPathRuntype.check('others.0.some')]: 'some4'
          }
        }
      });
    });
  });
  describe('remove item', () => {
    describe('by path', () => {
      test('flat item', () => {
        const state = generateOneFieldState();

        expect(
          formStateReducer(state, {
            type: FormStateActionTypes.removeItem,
            payload: {
              fieldPath: FormValuesFieldPathRuntype.check('some')
            }
          })
        ).toEqual({
          ...state,
          itemsConfig: {
            items: {
              [ROOT_ID.id]: {
                id: ROOT_ID.id,
                itemsIds: []
              }
            },
            itemsIdsMap: {
              '': ROOT_ID.id
            }
          }
        });
      });
      test('array', () => {
        const state = generateOneFieldArrayState();

        expect(
          formStateReducer(state, {
            type: FormStateActionTypes.removeItem,
            payload: {
              fieldPath: FormValuesFieldPathRuntype.check('others')
            }
          })
        ).toEqual({
          ...state,
          itemsConfig: {
            items: {
              [ROOT_ID.id]: {
                id: ROOT_ID.id,
                itemsIds: []
              }
            },
            itemsIdsMap: {
              '': ROOT_ID.id
            }
          }
        });
      });
      test('array child', () => {
        const state = generateOneFieldArrayState();

        expect(
          formStateReducer(state, {
            type: FormStateActionTypes.removeItem,
            payload: {
              fieldPath: FormValuesFieldPathRuntype.check('others.0')
            }
          })
        ).toEqual({
          ...state,
          itemsConfig: {
            items: {
              [ROOT_ID.id]: {
                id: ROOT_ID.id,
                itemsIds: ['others0']
              },
              others0: {
                id: 'others0',
                dataState: expect.objectContaining({
                  fieldName: 'others'
                }),
                itemsIds: [],
                itemsTemplate: expect.objectContaining({})
              }
            },
            itemsIdsMap: {
              '': ROOT_ID.id,
              others: 'others0'
            }
          }
        });
      });
    });
  });
  describe('update item', () => {
    test('', () => {
      const state = generateOneFieldState();

      expect(
        formStateReducer(state, {
          type: FormStateActionTypes.updateItem,
          payload: {
            fieldPath: FormValuesFieldPathRuntype.check('some'),
            updateData: {
              itemsIds: ['test']
            }
          }
        })
      ).toEqual({
        ...state,
        itemsConfig: {
          ...state.itemsConfig,
          items: {
            ...state.itemsConfig.items,
            some0: {
              ...state.itemsConfig.items.some0,
              itemsIds: ['test']
            }
          }
        }
      });
    });
  });
});
