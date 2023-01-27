import { SchemaField, SchemaFieldTemplate } from '../../schema';
import { FormStateFieldConfig } from '../fields';
import { FormStateElements } from '../elements';

export type FormStateItemId = string;

export type FormStateItemDataState<
  FSFC extends FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
> = Pick<FSFC, 'validations' | 'type' | 'fieldName' | 'defaultValue'>;

export type FormStateItem =
  //   <
  //   FSFC extends
  //     | FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
  //     | undefined = undefined
  // >
  {
    id: FormStateItemId;
    dataState?: FormStateItemDataState<any>;
    // dataState: FSFC extends FormStateFieldConfig<
    //   SchemaFieldTemplate,
    //   SchemaField<SchemaFieldTemplate>
    // >
    //   ? FormStateItemDataState<FSFC>
    //   : undefined;
    itemsIds?: Array<FormStateItemId>;
    itemsTemplate?: FormStateElements;
  };

export type FormStateFormattedItem =
  //   <
  //   FSFC extends
  //     | FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
  //     | undefined = undefined
  // >
  {
    id: FormStateItemId;
    field: FormStateItemDataState<any>['fieldName'];
    dataType: FormStateItemDataState<any>['type'];
    validations: FormStateItemDataState<any>['validations'];
  };
// & (FSFC extends FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
//   ? {
//       field: FormStateItemDataState<FSFC>['fieldName'];
//       dataType: FormStateItemDataState<FSFC>['type'];
//       validations: FormStateItemDataState<FSFC>['validations'];
//     }
//   : {});

export type FormStateItems = Record<FormStateItemId, FormStateItem>;
