import {
  FormStateElement,
  FormStateElementsConfig,
  FormStateFieldsConfig,
  SchemaFieldName,
  SchemaFieldsTemplate,
  FormStateFieldsTypes,
  NamesWithNestedPaths
} from '../../../types';
import { ROOT_ID } from '../../../constants';

export const generateElementsConfig = <SFT extends SchemaFieldsTemplate>(
  fieldsConfig: FormStateFieldsConfig<SFT>
): FormStateElementsConfig => {
  const parseElement = <
    FieldName extends Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>,
    FieldConfig extends FormStateFieldsConfig<SFT>[FieldName]
  >(
    fieldName: FieldName,
    fieldConfig: FieldConfig
  ): FormStateElement => {
    const element = {
      field: fieldName
    } as FormStateElement;

    if (fieldConfig.type === FormStateFieldsTypes.tuple) {
      // @ts-ignore
      element.elements = fieldConfig.fieldsConfigsNames.map(fieldName =>
        parseElement(fieldName, fieldsConfig[fieldName])
      );
    }

    return element;
  };

  return {
    [ROOT_ID.id]: {
      elements: fieldsConfig.ROOT_ID.fieldsConfigsNames.map(fieldName =>
        parseElement(fieldName, fieldsConfig[fieldName])
      )
    }
  };
};
