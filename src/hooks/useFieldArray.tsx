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

export type UseFieldArrayReturn<SFT extends SchemaFieldArrayTemplate> = {
  append: (value: FormValue<SFT>, options: { fixValue?: boolean }) => void;
  prepend: (value: FormValue<SFT>) => void;
  remove: (index: number) => void;
  update: (index: number, value: FormValue<SFT>) => void;
};

export const useFieldArray = <SFT extends SchemaFieldArrayTemplate>({
  name
}: UseFieldArrayProps<SFT>): UseFieldArrayReturn<SFT> => {
  const { appendToArray, removeItem } = useFormContext();
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

  const prepend = useCallback(() => {}, [fieldPath]);
  const remove = useCallback<UseFieldArrayReturn<SFT>['remove']>(
    index => {
      removeItem({
        fieldPath: concatPaths(fieldPath, FormValuesFieldPathRuntype.check(index.toString()))
      });
    },
    [fieldPath, removeItem]
  );
  const update = useCallback(() => {}, [fieldPath]);

  return {
    append,
    prepend,
    remove,
    update
  };
};
