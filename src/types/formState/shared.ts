import { FormStateItemsConfig } from './items';
import { Schema, SchemaFieldsTemplate } from '../schema';
import { DeepPartial } from 'react-hook-form';
import { FormValues } from '../formValues';

export enum FormStateActionTypes {
  'reset' = 'reset',
  'uploadSchema' = 'uploadSchema'
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

export type FormStateAction<SFT extends SchemaFieldsTemplate> =
  | FormStateResetAction
  | FormStateUploadSchemaAction<SFT>;

export type FormState = {
  itemsConfig: FormStateItemsConfig;
};
