import React, { Context, createContext, ReactNode, useContext } from "react";
import { UseFormReturn } from "./useForm";
import { SchemaFieldsTemplate } from "../types";

export type FormProviderProps<SFT extends SchemaFieldsTemplate> = {
  children: ReactNode | ReactNode[];
} & UseFormReturn<SFT>;

const FormContext = createContext<UseFormReturn<{}>>({} as UseFormReturn<{}>);

export const FormProvider = <SFT extends SchemaFieldsTemplate>(
  props: FormProviderProps<SFT>
) => {
  const { children, ...data } = props;
  const TypedContext = FormContext as unknown as Context<UseFormReturn<SFT>>;

  return <TypedContext.Provider value={data}>{children}</TypedContext.Provider>;
};

export const useFormContext = <
  SFT extends SchemaFieldsTemplate
>(): UseFormReturn<SFT> => {
  const TypedContext = FormContext as unknown as Context<UseFormReturn<SFT>>;

  return useContext(TypedContext);
};
