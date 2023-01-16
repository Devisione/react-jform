import {
  SchemaField,
  SchemaFieldName,
  SchemaFieldNestedTemplate,
  SchemaFields,
  SchemaFieldsTemplate,
  SchemaFieldTemplate,
} from "../../schema";
import { ROOT_ID } from "../../../constants";
import {
  GetTemplateFromField,
  NamesWithNestedPaths,
  SchemaFieldFromPath,
} from "../../utils";
import { FormStateFieldType } from "./shared";

export type FormStateFieldConfig<
  SFT extends SchemaFieldTemplate,
  SF extends SchemaField<SFT>
> = Pick<SF, "validations" | "defaultValue"> & {
  fieldName: SchemaFieldName;
  type: FormStateFieldType;
} & (GetTemplateFromField<SF> extends SchemaFieldNestedTemplate
    ? {
        fieldsConfigsNames: Array<
          Extract<keyof GetTemplateFromField<SF>["fields"], SchemaFieldName>
        >;
      }
    : {});

// TODO: fix this problems
export type FormStateFieldsConfig<SFT extends SchemaFieldsTemplate> = {
  [ROOT_ID.id]: {
    fieldsConfigsNames: Array<Extract<keyof SFT, SchemaFieldName>>;
  };
} & {
  [FieldName in keyof NamesWithNestedPaths<SFT>]: FormStateFieldConfig<
    GetTemplateFromField<
      SchemaFieldFromPath<
        SFT,
        SchemaFields<SFT>,
        // @ts-ignore
        NamesWithNestedPaths<SFT>[FieldName]
      >
    >,
    // @ts-ignore
    SchemaFieldFromPath<
      SFT,
      SchemaFields<SFT>,
      // @ts-ignore
      NamesWithNestedPaths<SFT>[FieldName]
    >
  >;
};
