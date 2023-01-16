import { SchemaFieldTypes } from './shared';
import { OneOfValidation, RequiredValidation, ValidationsNames } from '../../validation';
import { FormValue } from '../../formValues';

type StringValue = FormValue<{ type: SchemaFieldTypes.string }>;

export type SchemaFieldString = {
  type: `${SchemaFieldTypes.string}`;
  defaultValue?: StringValue;
  validations?: Partial<{
    [ValidationsNames.required]: RequiredValidation;
    [ValidationsNames.oneOf]: OneOfValidation<StringValue>;
  }>;
};
