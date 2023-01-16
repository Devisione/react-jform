import {
  FormStateFieldsConfig,
  SchemaFields,
  SchemaFieldsTemplate,
  SchemaField,
  FormStateFieldConfig,
  SchemaFieldTypes,
  SchemaFieldTemplate,
  SchemaFieldName
} from '../../../types';
import { ROOT_ID } from '../../../constants';
import { parseFieldConfig } from './parseFieldConfig';

export type GenerateFieldsConfigProps<SFT extends SchemaFieldsTemplate> = {
  schemaFields: SchemaFields<SFT>;
  asRoot?: boolean;
};

export type GenerateFieldsConfigReturn<SFT extends SchemaFieldsTemplate> =
  FormStateFieldsConfig<SFT>;

export const generateFieldsConfig = <SFT extends SchemaFieldsTemplate>({
  schemaFields,
  asRoot = false
}: GenerateFieldsConfigProps<SFT>): GenerateFieldsConfigReturn<SFT> => {
  const fieldsConfig = {} as unknown as FormStateFieldsConfig<SFT>;

  const generateFieldConfig = <
    FieldTemplate extends SchemaFieldTemplate,
    Field extends SchemaField<FieldTemplate>
  >(
    schemaFieldName: SchemaFieldName,
    schemaField: Field
  ): FormStateFieldConfig<FieldTemplate, Field> => {
    const fieldConfig = parseFieldConfig<FieldTemplate, Field>(schemaFieldName, schemaField);

    if (schemaField.type === SchemaFieldTypes.array) {
      const childrenFieldsConfigs = generateFieldsConfig({
        schemaFields: schemaField.fields
      });

      Object.assign(fieldsConfig, childrenFieldsConfigs);
    }

    return fieldConfig;
  };

  (Object.keys(schemaFields) as Array<Extract<keyof SFT, SchemaFieldName>>).forEach(
    schemaFieldName => {
      if (asRoot) {
        if (!fieldsConfig[ROOT_ID.id]) {
          fieldsConfig[ROOT_ID.id] = { fieldsConfigsNames: [] };
        }

        if (fieldsConfig[ROOT_ID.id].fieldsConfigsNames) {
          fieldsConfig[ROOT_ID.id].fieldsConfigsNames.push(schemaFieldName);
        }
      }

      Object.assign(fieldsConfig, {
        [schemaFieldName]: generateFieldConfig(schemaFieldName, schemaFields[schemaFieldName])
      });
    }
  );

  return fieldsConfig;
};
