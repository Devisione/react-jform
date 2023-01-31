import { FormStateItemsConfig } from './items';
import { Schema, SchemaFieldsTemplate } from '../schema';
import { DeepPartial } from 'react-hook-form';
import { FormValues } from '../formValues';
import { FormValuesFieldPath } from '../paths';

export enum FormStateActionTypes {
  'reset' = 'reset',
  'uploadSchema' = 'uploadSchema',
  'appendToArray' = 'appendToArray',
  'removeItem' = 'removeItem'
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

export type FormStateAppendToArrayAction = {
  type: `${FormStateActionTypes.appendToArray}`;
  payload: {
    fieldPath: FormValuesFieldPath;
    value: FormValues<SchemaFieldsTemplate>;
  };
};

export type FormStateRemoveItemAction = {
  type: `${FormStateActionTypes.removeItem}`;
  payload: { fieldPath: FormValuesFieldPath };
};

export type FormStateAction<SFT extends SchemaFieldsTemplate> =
  | FormStateResetAction
  | FormStateUploadSchemaAction<SFT>
  | FormStateAppendToArrayAction
  | FormStateRemoveItemAction;

export type FormState = {
  itemsConfig: FormStateItemsConfig;
};
