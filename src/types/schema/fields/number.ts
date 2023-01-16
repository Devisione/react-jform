import { SchemaFieldTypes } from './shared';
import { OneOfValidation, RequiredValidation, ValidationsNames } from '../../validation';
import { FormValue } from '../../formValues';

type NumberValue = FormValue<{ type: SchemaFieldTypes.number }>;

export type SchemaFieldNumber = {
  type: `${SchemaFieldTypes.number}`;
  defaultValue?: NumberValue;
  validations?: Partial<{
    [ValidationsNames.required]: RequiredValidation;
    [ValidationsNames.oneOf]: OneOfValidation<NumberValue>;
  }>;
};
