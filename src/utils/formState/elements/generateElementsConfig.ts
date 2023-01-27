import {
  FormStateElement,
  FormStateElementsConfig,
  FormStateFieldsConfig,
  SchemaFieldsTemplate,
  FormStateFieldsTypes,
  FormStateFieldConfig,
  SchemaFieldTemplate,
  SchemaField
} from '../../../types';
import { ROOT_ID } from '../../../constants';

export const generateElementsConfig = <SFT extends SchemaFieldsTemplate>(
  fieldsConfig: FormStateFieldsConfig<SFT>
): FormStateElementsConfig => {
  const parseElement = ({
    // @ts-ignore
    fieldsConfigsNames,
    ...restFieldConfig
  }: FormStateFieldConfig<
    SchemaFieldTemplate,
    SchemaField<SchemaFieldTemplate>
  >): FormStateElement => {
    const element: FormStateElement = {
      field: restFieldConfig
    };

    if (restFieldConfig.type === FormStateFieldsTypes.tuple) {
      // @ts-ignore
      element.elements = fieldsConfigsNames.map(fieldName => parseElement(fieldsConfig[fieldName]));
    }

    return element;
  };

  return {
    [ROOT_ID.id]: {
      elements: fieldsConfig.ROOT_ID.fieldsConfigsNames.map(fieldName =>
        parseElement(fieldsConfig[fieldName])
      )
    }
  };
};
