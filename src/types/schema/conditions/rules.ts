import { FormValue, FormValueType } from '../../formValues';
import { SchemaField, SchemaFieldTemplate } from '../fields';

export type SchemaRuleResult<TargetFieldTemplate extends SchemaFieldTemplate> = Partial<
  Pick<SchemaField<TargetFieldTemplate>, 'validations' | 'defaultValue'> & {
    value?: FormValue<TargetFieldTemplate>;
  }
>;

export type SchemaIsRule<TargetFieldTemplate extends SchemaFieldTemplate> = {
  is: FormValueType;
  then: SchemaRuleResult<TargetFieldTemplate>;
};

export type SchemaRule<TargetFieldTemplate extends SchemaFieldTemplate> =
  SchemaIsRule<TargetFieldTemplate>;

export type SchemaRules<TargetFieldTemplate extends SchemaFieldTemplate> =
  SchemaRule<TargetFieldTemplate>[];
