import { ROOT_ID } from '../../../constants';
import {
  FormStateFieldConfig,
  FormStateFieldsConfig,
  FormStateFieldsTypes,
  SchemaField,
  SchemaFieldName,
  SchemaFieldNestedTemplate,
  SchemaFieldsTemplate,
  SchemaFieldTemplate
} from '../../../types';
import * as yup from 'yup';
import { addYupValidationToSchema } from '../validations';

export type GenerateCastSchemaProps<SFT extends SchemaFieldsTemplate> = FormStateFieldsConfig<SFT>;

export type GenerateCastSchemaReturn = yup.Schema;

export const generateCastSchema = <SFT extends SchemaFieldsTemplate>(
  fieldsConfig: GenerateCastSchemaProps<SFT>
): GenerateCastSchemaReturn => {
  const generateCastFieldSchema = <
    FSFC extends FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
  >(
    fieldConfig: FSFC
  ): yup.Schema => {
    let fieldCastSchema: yup.Schema;

    if (fieldConfig.type !== FormStateFieldsTypes.tuple) {
      fieldCastSchema = yup[fieldConfig.type]() as yup.Schema;
    } else {
      fieldCastSchema = yup.array().of(
        yup.object().shape(
          (
            fieldConfig as FormStateFieldConfig<
              SchemaFieldNestedTemplate,
              SchemaField<SchemaFieldNestedTemplate>
            >
          ).fieldsConfigsNames.reduce((shapeOfValidationSchema, fieldConfigName) => {
            const fieldConfig = fieldsConfig[fieldConfigName];
            // @ts-ignore
            shapeOfValidationSchema[fieldConfigName] = generateCastFieldSchema(fieldConfig);

            return shapeOfValidationSchema;
          }, {} as Record<Extract<keyof SFT, SchemaFieldName>, yup.Schema>)
        )
      ) as yup.Schema;
    }

    if (Reflect.has(fieldConfig, 'defaultValue')) {
      fieldCastSchema = fieldCastSchema['default'](fieldConfig.defaultValue) as yup.Schema;
    }

    if (fieldConfig.validations) {
      const { validations } = fieldConfig;
      (Object.keys(validations) as Array<keyof typeof validations>).forEach(validationName => {
        const validation = validations[validationName];

        fieldCastSchema = addYupValidationToSchema({
          validationName,
          validation,
          yupSchema: fieldCastSchema
        });
      });
    }

    return fieldCastSchema;
  };

  const shapeOfYupSchema = fieldsConfig[ROOT_ID.id].fieldsConfigsNames.reduce(
    (shapeOfValidationSchema, fieldConfigName) => {
      const fieldConfig = fieldsConfig[fieldConfigName];
      shapeOfValidationSchema[fieldConfigName] = generateCastFieldSchema(fieldConfig);

      return shapeOfValidationSchema;
    },
    {} as Record<Extract<keyof SFT, SchemaFieldName>, yup.Schema>
  );

  return yup.object().shape(shapeOfYupSchema);
};
