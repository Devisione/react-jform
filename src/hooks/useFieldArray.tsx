import { UseFieldArrayProps as UseRHFFieldArrayProps } from 'react-hook-form';
import { FormValue, FormValuesFieldPathRuntype, SchemaFieldArrayTemplate } from '../types';
import { useCallback } from 'react';
import { useFormContext } from './useFormContext';
import { concatPaths } from '../helpers';

type UseFieldArrayProps<SFT extends SchemaFieldArrayTemplate> = Pick<
  UseRHFFieldArrayProps<FormValue<SFT>>,
  'control'
> & {
  name: string;
};

type Options = { fixValue?: boolean };

export type UseFieldArrayReturn<SFT extends SchemaFieldArrayTemplate> = {
  append: (value: FormValue<SFT>, options: Options) => void;
  prepend: (value: FormValue<SFT>, options: Options) => void;
  remove: (index: number) => void;
  update: (index: number, value: FormValue<SFT>, options: Options) => void;
};

export const useFieldArray = <SFT extends SchemaFieldArrayTemplate>({
  name
}: UseFieldArrayProps<SFT>): UseFieldArrayReturn<SFT> => {
  const { appendToArray, prependToArray, updateInArray, removeItem } = useFormContext();
  const fieldPath = FormValuesFieldPathRuntype.check(name);

  const append = useCallback<UseFieldArrayReturn<SFT>['append']>(
    (rawValue, options) => {
      // TODO: сделать фикс значений
      const value = options?.fixValue ? (() => rawValue)() : rawValue;

      appendToArray({
        fieldPath,
        // @ts-ignore
        value
      });
    },
    [fieldPath, appendToArray]
  );

  const prepend = useCallback<UseFieldArrayReturn<SFT>['prepend']>(
    (rawValue, options) => {
      // TODO: сделать фикс значений
      const value = options?.fixValue ? (() => rawValue)() : rawValue;

      prependToArray({
        fieldPath,
        // @ts-ignore
        value
      });
    },
    [fieldPath, prependToArray]
  );

  const remove = useCallback<UseFieldArrayReturn<SFT>['remove']>(
    index => {
      removeItem({
        fieldPath: concatPaths(fieldPath, FormValuesFieldPathRuntype.check(index.toString()))
      });
    },
    [fieldPath, removeItem]
  );

  const update = useCallback<UseFieldArrayReturn<SFT>['update']>(
    (index, rawValue, options) => {
      // TODO: сделать фикс значений
      const value = options?.fixValue ? (() => rawValue)() : rawValue;

      updateInArray({
        fieldPath: concatPaths(fieldPath, FormValuesFieldPathRuntype.check(index.toString())),
        // @ts-ignore
        value
      });
    },
    [fieldPath, updateInArray]
  );

  return {
    append,
    prepend,
    remove,
    update
  };
};
