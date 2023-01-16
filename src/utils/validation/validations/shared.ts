import { SchemaField, SchemaFieldTemplate, ValidationsNames } from '../../../types';
import { Schema as YupSchema } from 'yup';
import { arrayUniqueSlave } from './index';

export type AddYupValidationToSchemaProps<
  SF extends SchemaField<SchemaFieldTemplate>,
  VN extends keyof SF['validations'] = keyof SF['validations']
> = {
  validationName: VN;
  validation: SF['validations'][VN];
  yupSchema: YupSchema;
};

export type AddYupValidationToSchemaReturn = YupSchema;

export const addYupValidationToSchema = <
  SFT extends SchemaFieldTemplate,
  SF extends SchemaField<SchemaFieldTemplate> = SchemaField<SchemaFieldTemplate>
>({
  validationName,
  validation,
  yupSchema
}: AddYupValidationToSchemaProps<SF>): AddYupValidationToSchemaReturn => {
  if (validationName === ValidationsNames.arrayUniqueSlave) {
    return yupSchema.test(
      ValidationsNames.arrayUniqueSlave,
      ValidationsNames.arrayUniqueSlave,
      value => {
        // @ts-ignore
        return arrayUniqueSlave<SFT>(value, validation);
      }
    );
  }

  if (validationName === ValidationsNames.required) {
    return validation ? yupSchema[ValidationsNames.required](validationName) : yupSchema;
  }

  if (yupSchema[validationName as keyof YupSchema]) {
    return yupSchema[validationName as keyof YupSchema](validation, validationName);
  }

  return yupSchema;
};
