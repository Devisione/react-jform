import { FormStateItem, FormStateItemsConfig } from './items';
import { Schema, SchemaFieldsTemplate } from '../schema';
import { DeepPartial } from 'react-hook-form';
import { FormValues } from '../formValues';
import { FormValuesFieldPath } from '../paths';

export enum FormStateActionTypes {
  'reset' = 'reset',
  'uploadSchema' = 'uploadSchema',
  'addToArray' = 'addToArray',
  'appendToArray' = 'appendToArray',
  'prependToArray' = 'prependToArray',
  'removeItem' = 'removeItem',
  'updateItem' = 'updateItem'
}

export type FormStateResetAction = {
  type: `${FormStateActionTypes.reset}`;
};

export type FormStateUploadSchemaAction<SFT extends SchemaFieldsTemplate> = {
  type: `${FormStateActionTypes.uploadSchema}`;
  payload: {
    schema: Schema<SFT>;
    defaultValues?: DeepPartial<FormValues<SFT>>;
  };
};

export type FormStateRemoveItemAction = {
  type: `${FormStateActionTypes.removeItem}`;
  payload: { fieldPath: FormValuesFieldPath };
};

export type FormStateUpdateItemAction = {
  type: `${FormStateActionTypes.updateItem}`;
  payload: {
    fieldPath: FormValuesFieldPath;
    updateData: DeepPartial<
      Omit<FormStateItem, 'id' | 'dataState'> & {
        dataState?: Omit<FormStateItem['dataState'], 'fieldName' | 'type'>;
      }
    >;
  };
};

export type FormStateAddToArrayAction = {
  type: `${FormStateActionTypes.addToArray}`;
  payload: {
    fieldPath: FormValuesFieldPath;
    value: FormValues<SchemaFieldsTemplate>;
  };
};

export type FormStateAppendToArrayAction = {
  type: `${FormStateActionTypes.appendToArray}`;
  payload: {
    fieldPath: FormValuesFieldPath;
    value: FormValues<SchemaFieldsTemplate>;
  };
};

export type FormStatePrependToArrayAction = {
  type: `${FormStateActionTypes.prependToArray}`;
  payload: {
    fieldPath: FormValuesFieldPath;
    value: FormValues<SchemaFieldsTemplate>;
  };
};

export type FormStateAction<SFT extends SchemaFieldsTemplate> =
  | FormStateResetAction
  | FormStateUploadSchemaAction<SFT>
  | FormStateAddToArrayAction
  | FormStateAppendToArrayAction
  | FormStatePrependToArrayAction
  | FormStateRemoveItemAction
  | FormStateUpdateItemAction;

export type FormState = {
  itemsConfig: FormStateItemsConfig;
};
