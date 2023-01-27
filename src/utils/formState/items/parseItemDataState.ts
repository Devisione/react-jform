import {
  FormStateFieldConfig,
  FormStateItemDataState,
  SchemaField,
  SchemaFieldTemplate
} from '../../../types';

export type ParseItemDataStateProps<SFT extends SchemaFieldTemplate> = FormStateFieldConfig<
  SFT,
  SchemaField<SFT>
>;

export type ParseItemDataStateReturn =
  //   <
  //   FSFC extends
  //     | FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
  //     | undefined = undefined
  // >
  FormStateItemDataState<any>;
//   = FSFC extends FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
//   ? FormStateItemDataState<FSFC>
//   : undefined;

export const parseItemDataState = <SFT extends SchemaFieldTemplate>(
  elementField: ParseItemDataStateProps<SFT>
): ParseItemDataStateReturn => {
  const dataState: any = {
    fieldName: elementField.fieldName,
    type: elementField.type,
    value: elementField.defaultValue ?? undefined,
    defaultValue: elementField.defaultValue ?? undefined
  };

  if (Reflect.has(elementField, 'validations') && dataState) {
    dataState.validations = elementField.validations;
  }

  return dataState;
};
