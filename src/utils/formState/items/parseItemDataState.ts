import { FormStateElement, FormStateItemDataState } from '../../../types';

export type ParseItemDataStateProps = FormStateElement['field'];

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

export const parseItemDataState = (
  elementField: ParseItemDataStateProps
): ParseItemDataStateReturn => {
  if (!elementField) {
    throw new Error('no field provided');
  }

  const dataState: any = {
    fieldName: elementField.fieldName,
    type: elementField.type,
    defaultValue: elementField.defaultValue ?? undefined
  };

  if (Reflect.has(elementField, 'validations') && dataState) {
    dataState.validations = elementField.validations;
  }

  return dataState;
};
