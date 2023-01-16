// import {
//   FormStateFieldsConfig,
//   SchemaFieldsTemplate,
//   FormStateFieldConfig,
//   GetTemplateFromField,
//   SchemaFieldFromPath,
//   SchemaFields,
//   NamesWithNestedPaths,
//   SchemaFieldName,
//   SchemaFieldTemplate,
//   SchemaField,
//   ValidationsNames,
//   YupSchemaType,
//   FormStateFieldsTypes,
//   YupSchemaTypes,
//   FormStateItemsConfig
// } from '../../types';
// import * as yup from 'yup';
// import { ROOT_ID } from '../../constants';
// import { uniqueSlave } from '../../../utils/validation/validations/uniqueSlave';
// import { addYupValidationToSchema } from './validations';
// // .sort((a, b) => a.split('.').length === b.split('.').length ? a > b : a.split('.').length - b.split('.').length)
// const generateYupSchema = <SFT extends SchemaFieldsTemplate>(
//   schemaType: YupSchemaType,
//   fieldsConfig: FormStateFieldsConfig<SFT>,
//   itemsConfig: FormStateItemsConfig
// ): yup.Schema => {
//   const generateFieldYupSchema = <
//     FSFC extends FormStateFieldConfig<SchemaFieldTemplate, SchemaField<SchemaFieldTemplate>>
//   >(
//     field: FSFC
//   ): yup.Schema => {
//     if (field.validations) {
//       const validations = field.validations;
//       let fieldYupSchema = yup.mixed();
//
//       if (field.type !== FormStateFieldsTypes.tuple) {
//         fieldYupSchema = yup[field.type]() as yup.Schema;
//       } else {
//         if (schemaType === YupSchemaTypes.cast) {
//         } else {
//           fieldYupSchema = yup.array().of(
//             item.itemsIds
//               ?.map(createFieldsMap)
//               .filter(Boolean)
//               .map(i =>
//                 yup.object().shape(
//                   (Array.isArray(i) ? i : [i]).reduce((result, match) => {
//                     return { ...result, ...match };
//                   }, {})
//                 )
//               ) || []
//           );
//         }
//       }
//
//       (Object.keys(validations) as Array<keyof typeof validations>).forEach(validationName => {
//         const validation = validations[validationName];
//
//         return addYupValidationToSchema({ validationName, validation, yupSchema });
//     }
//   };
//
//   const shapeOfYupSchema = fieldsConfig[ROOT_ID.id].fieldsConfigsNames.reduce(
//     (shapeOfValidationSchema, fieldConfigName) => {
//       const fieldConfig = fieldsConfig[fieldConfigName];
//       shapeOfValidationSchema[fieldConfigName] = generateFieldYupSchema(fieldConfig);
//
//       return shapeOfValidationSchema;
//     },
//     {} as Record<Extract<keyof SFT, SchemaFieldName>, yup.Schema>
//   );
//
//   return yup.object().shape(shapeOfYupSchema);
// };

export {};
