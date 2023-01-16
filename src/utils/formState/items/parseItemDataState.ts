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
  fieldConfig: ParseItemDataStateProps<SFT>
): ParseItemDataStateReturn => {
  const dataState: any = {
    fieldName: fieldConfig.fieldName,
    type: fieldConfig.type,
    value: fieldConfig.defaultValue ?? undefined,
    defaultValue: fieldConfig.defaultValue ?? undefined
  };

  if (Reflect.has(fieldConfig, 'validations') && dataState) {
    dataState.validations = fieldConfig.validations;
  }

  return dataState;
};
