import {
  FormState,
  FormStateAction,
  FormStateActionTypes,
  FormStateUploadSchemaAction,
  FormValues,
  Schema,
  SchemaFieldsTemplate
} from '../types';
import { DeepPartial } from 'react-hook-form';
import { useCallback, useEffect, useReducer } from 'react';
import { defaultFormState, formStateReducer } from '../utils';

export type UseFormStateProps<SFT extends SchemaFieldsTemplate> = {
  schema: Schema<SFT>;
  defaultValues?: DeepPartial<FormValues<SFT>>;
};

export type UseFormStateReturn<SFT extends SchemaFieldsTemplate> = {
  resetFormState: () => void;
  uploadSchema: (payload: FormStateUploadSchemaAction<SFT>['payload']) => void;
  state: FormState;
};

export const useFormState = <SFT extends SchemaFieldsTemplate>({
  schema,
  defaultValues
}: UseFormStateProps<SFT>): UseFormStateReturn<SFT> => {
  const [state, dispatch] = useReducer<
    (state: FormState, action: FormStateAction<SFT>) => FormState
  >(formStateReducer, defaultFormState);

  const resetFormState = useCallback(() => {
    dispatch({
      type: FormStateActionTypes.reset
    });
  }, [dispatch]);

  const uploadSchema = useCallback(
    (payload: FormStateUploadSchemaAction<SFT>['payload']) => {
      dispatch({
        type: FormStateActionTypes.uploadSchema,
        payload
      });
    },
    [dispatch]
  );

  useEffect(() => {
    uploadSchema({
      schema,
      defaultValues
    });
  }, [defaultValues, schema, dispatch]);

  return {
    resetFormState,
    uploadSchema,
    state
  };
};
