import { SchemaFieldTypes, SchemaFields, SchemaFieldArrayTemplate } from './shared';
import { ArrayUniqueSlaveValidation, MinValidation, ValidationsNames } from '../../validation';
import { FormArrayValues } from '../../formValues';

type ArrayValue<SFT extends SchemaFieldArrayTemplate> = Array<
  Partial<FormArrayValues<SFT>[number]>
>;

export type SchemaFieldArray<SFT extends SchemaFieldArrayTemplate> = {
  type: `${SchemaFieldTypes.array}`;
  defaultValue?: ArrayValue<SFT>;
  fields: SchemaFields<SFT['fields']>;
  validations?: Partial<{
    [ValidationsNames.min]: MinValidation;
    [ValidationsNames.arrayUniqueSlave]: ArrayUniqueSlaveValidation<SFT>;
  }>;
};
