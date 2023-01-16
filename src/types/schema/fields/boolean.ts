import { SchemaFieldTypes } from './shared';
import { RequiredValidation, ValidationsNames } from '../../validation';
import { FormValue } from '../../formValues';

type BooleanValue = FormValue<{ type: SchemaFieldTypes.boolean }>;

export type SchemaFieldBoolean = {
  type: `${SchemaFieldTypes.boolean}`;
  defaultValue?: BooleanValue;
  validations?: Partial<{
    [ValidationsNames.required]: RequiredValidation;
  }>;
};
