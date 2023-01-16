import {
  SchemaFieldName,
  SchemaFields,
  SchemaFieldsTemplate,
  SchemaFieldTemplate
} from '../fields';
import { SchemaRules } from './rules';
import { GetTemplateFromField, NamesWithNestedPaths, SchemaFieldFromPath } from '../../utils';

export type SchemaFieldCondition<
  TargetFieldTemplate extends SchemaFieldTemplate,
  TargetFieldName extends SchemaFieldName,
  FieldsNames extends SchemaFieldName
> = {
  watchedField: Exclude<FieldsNames, TargetFieldName>;
  rules: SchemaRules<TargetFieldTemplate>;
};

export type SchemaFieldConditions<
  TargetFieldTemplate extends SchemaFieldTemplate,
  TargetFieldName extends SchemaFieldName,
  FieldsNames extends SchemaFieldName
> = Array<SchemaFieldCondition<TargetFieldTemplate, TargetFieldName, FieldsNames>>;

export type SchemaConditions<
  SFT extends SchemaFieldsTemplate,
  FieldsNames extends Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>
> = {
  [FieldName in FieldsNames]?: SchemaFieldConditions<
    GetTemplateFromField<
      SchemaFieldFromPath<SFT, SchemaFields<SFT>, NamesWithNestedPaths<SFT>[FieldName]>
    >,
    FieldName,
    FieldsNames
  >;
};
