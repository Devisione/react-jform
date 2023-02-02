import { FormStateFieldsTypes, SchemaFieldName } from '../../types';
import * as yup from 'yup';
import { addYupValidationToSchema } from './validations';
import { ValidationConfig, ValidationFieldConfig } from '../../types/validation/shared';

export type GenerateValidationSchemaProps = ValidationConfig;

export type GenerateValidationSchemaReturn = yup.Schema;

export function generateFieldValidationSchema(
  validationFieldConfig: ValidationFieldConfig
): yup.Schema {
  let fieldValidationSchema: yup.Schema;

  if (validationFieldConfig.type !== FormStateFieldsTypes.tuple) {
    fieldValidationSchema = yup[validationFieldConfig.type]() as yup.Schema;
  } else {
    fieldValidationSchema = yup[validationFieldConfig.type](
      // @ts-ignore
      validationFieldConfig.items?.map(generateValidationSchema) || []
    );
  }

  if (Reflect.has(validationFieldConfig, 'defaultValue')) {
    fieldValidationSchema = fieldValidationSchema['default'](
      validationFieldConfig.defaultValue
    ) as yup.Schema;
  }

  if (validationFieldConfig.validations) {
    const { validations } = validationFieldConfig;
    (Object.keys(validations) as Array<keyof typeof validations>).forEach(validationName => {
      const validation = validations[validationName];

      fieldValidationSchema = addYupValidationToSchema({
        validationName,
        validation,
        yupSchema: fieldValidationSchema
      });
    });
  }

  return fieldValidationSchema;
}

export function generateValidationSchema(
  validationConfig: GenerateValidationSchemaProps
): GenerateValidationSchemaReturn {
  const shapeOfYupSchema = Object.keys(validationConfig).reduce(
    (shapeOfValidationSchema, fieldName) => {
      const validationFieldConfig = validationConfig[fieldName];
      shapeOfValidationSchema[fieldName] = generateFieldValidationSchema(validationFieldConfig);

      return shapeOfValidationSchema;
    },
    {} as Record<SchemaFieldName, yup.Schema>
  );

  return yup.object().shape(shapeOfYupSchema);
}
