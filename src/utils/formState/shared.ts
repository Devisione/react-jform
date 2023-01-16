import {
  FormState,
  FormStateAction,
  FormStateActionTypes,
  FormValuesFieldPathRuntype,
  SchemaFieldsTemplate
} from '../../types';
import { ROOT_ID } from '../../constants';
import { generateFieldsConfig } from './fields';
import { generateElementsConfig } from './elements';
import { generateItemsConfig } from './items';

export const defaultFormState: FormState = {
  itemsConfig: {
    items: {
      [ROOT_ID.id]: {
        id: ROOT_ID.id
      }
    },
    itemsIdsMap: {
      [FormValuesFieldPathRuntype.check('')]: ROOT_ID.id
    }
  }
};

export const formStateReducer = <SFT extends SchemaFieldsTemplate>(
  state: FormState,
  action: FormStateAction<SFT>
): FormState => {
  switch (action.type) {
    case FormStateActionTypes.uploadSchema: {
      const { schema } = action.payload;

      const fieldsConfig = generateFieldsConfig<SFT>({
        schemaFields: schema.fields,
        asRoot: true
      });
      const elementsConfig = generateElementsConfig<SFT>(fieldsConfig);
      const itemsConfig = generateItemsConfig<SFT>({ elementsConfig, fieldsConfig });

      return {
        ...formStateReducer<SFT>(state, { type: FormStateActionTypes.reset }),
        itemsConfig
      };
    }
    case FormStateActionTypes.reset: {
      return defaultFormState;
    }
    default: {
      return state;
    }
  }
};
