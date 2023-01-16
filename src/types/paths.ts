import { Static, String } from 'runtypes';

export enum PathsNames {
  schemaFieldPath = 'schema-field-path',
  formStateFieldPath = 'form-state-field-path',
  formValuesFieldPath = 'form-values-field-path'
}

export const FieldNameRuntype = String.withBrand('FieldName').withConstraint(_ => {
  return !_.includes('.');
});

export type FieldName = Static<typeof FieldNameRuntype>;

export const SchemaFieldPathRuntype = String.withBrand('SchemaFieldPath').withConstraint(_ => {
  if (FieldNameRuntype.guard(_)) {
    return true;
  }

  return _.includes('fields');
});
export type SchemaFieldPath = Static<typeof SchemaFieldPathRuntype>;

export const FormStateFieldPathRuntype = String.withBrand('FormStateFieldPath').withConstraint(
  _ => {
    if (FieldNameRuntype.guard(_)) {
      return true;
    }

    return _.includes('items');
  }
);
export type FormStateFieldPath = Static<typeof FormStateFieldPathRuntype>;

export const FormStateValidationSchemaPathRuntype = String.withBrand(
  'FormStateValidationSchemaPath'
).withConstraint(_ => {
  if (FieldNameRuntype.guard(_)) {
    return true;
  }

  return _.includes('[');
});
export type FormStateValidationSchemaPath = Static<typeof FormStateValidationSchemaPathRuntype>;

export const FormValuesFieldPathRuntype = String.withBrand('FormValuesFieldPath').withConstraint(
  _ => {
    if (FieldNameRuntype.guard(_)) {
      return true;
    }

    return (
      !FormStateValidationSchemaPathRuntype.guard(_) &&
      !FormStateFieldPathRuntype.guard(_) &&
      !SchemaFieldPathRuntype.guard(_)
    );
  }
);

export type FormValuesFieldPath = Static<typeof FormValuesFieldPathRuntype>;
