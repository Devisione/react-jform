import {
  FormStateFormattedItem,
  FormValues,
  FormValuesFieldPathRuntype,
  NamesWithNestedPaths,
  Schema,
  SchemaFieldName,
  SchemaFieldsTemplate
} from '../types';
import {
  DeepPartial,
  useForm as useFormRHF,
  UseFormReturn as UseFormReturnRHF
} from 'react-hook-form';
import { useFormState, UseFormStateReturn } from './useFormState';
import { formatItem, getItem as getItemUtils } from '../utils';

export type UseFormProps<SFT extends SchemaFieldsTemplate> = {
  schema: Schema<SFT>;
  defaultValues?: DeepPartial<FormValues<SFT>>;
};

export type UseFormReturn<
  SFT extends SchemaFieldsTemplate,
  FieldsNames = Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>
> = Pick<UseFormReturnRHF<FormValues<SFT>>, 'register'> &
  Pick<
    UseFormStateReturn<SFT>,
    'appendToArray' | 'prependToArray' | 'updateInArray' | 'removeItem'
  > & {
    getItem: (fieldPath: FieldsNames) => FormStateFormattedItem | undefined;
  };

export const useForm = <SFT extends SchemaFieldsTemplate>({
  schema,
  defaultValues
}: UseFormProps<SFT>): UseFormReturn<SFT> => {
  const { state, appendToArray, prependToArray, updateInArray, removeItem } = useFormState<SFT>({
    schema,
    defaultValues
  });
  const formMethodsRHF = useFormRHF<FormValues<SFT>>({
    defaultValues
  });
  const { register } = formMethodsRHF;

  const getItem = <FieldName extends Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>>(
    fieldPath: FieldName
  ) => {
    const item = getItemUtils({
      itemsConfig: state.itemsConfig,
      fieldPath: FormValuesFieldPathRuntype.check(fieldPath)
    });

    if (!item) {
      return undefined;
    }

    return formatItem(item);
  };

  return {
    appendToArray,
    prependToArray,
    updateInArray,
    removeItem,
    register,
    getItem
  };
};
