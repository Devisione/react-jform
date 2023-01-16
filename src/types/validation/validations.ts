import { FormValueType } from '../formValues';
import { SchemaFieldArrayTemplate, SchemaFieldName } from '../schema';
import { NamesWithNestedPaths } from '../utils';

export type OneOfValidation<T extends FormValueType> = Array<T>;

export type RequiredValidation = boolean;

export type MinValidation = number;

export type ArrayUniqueSlaveValidation<SFT extends SchemaFieldArrayTemplate> = {
  masterProp: keyof SFT['fields'];
  slaveProp: keyof SFT['fields'];
  slavePropMapper?: Exclude<
    Extract<keyof NamesWithNestedPaths<SFT['fields']>, SchemaFieldName>,
    keyof SFT['fields']
  >;
};

export enum ValidationsNames {
  'oneOf' = 'oneOf',
  'required' = 'required',
  'min' = 'min',
  'arrayUniqueSlave' = 'arrayUniqueSlave'
}

export type ValidationName = `${ValidationsNames}`;
