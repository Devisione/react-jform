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
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { generateValidationConfig, generateValidationSchema } from '../utils/validation';

export type UseFormProps<SFT extends SchemaFieldsTemplate> = {
  schema: Schema<SFT>;
  defaultValues?: DeepPartial<FormValues<SFT>>;
};

export type UseFormReturn<
  SFT extends SchemaFieldsTemplate,
  FieldsNames = Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>
> = Pick<UseFormReturnRHF<FormValues<SFT>>, 'register' | 'handleSubmit'> &
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

  const validationSchema = useMemo(() => {
    const validationConfig = generateValidationConfig(state.itemsConfig);

    return generateValidationSchema(validationConfig);
  }, [state.itemsConfig]);

  const formMethodsRHF = useFormRHF<FormValues<SFT>>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { register, handleSubmit } = formMethodsRHF;

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
    handleSubmit,
    getItem
  };
};
