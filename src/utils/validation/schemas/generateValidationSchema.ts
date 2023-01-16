// import {
//   FormStateFieldConfig,
//   FormStateFieldsTypes,
//   FormStateItemsConfig,
//   FormValuesFieldPath,
//   SchemaField,
//   SchemaFieldName,
//   SchemaFieldNestedTemplate
// } from '../../../types';
// import * as yup from 'yup';
// import { getItem, sortItemsIdsMap } from '../../formState/';
// import { addYupValidationToSchema } from '../validations';
//
// export type GenerateValidationSchemaProps = FormStateItemsConfig;
//
// export type GenerateValidationSchemaReturn = yup.Schema;
//
// export const generateValidationSchema = (
//   itemsConfig: GenerateValidationSchemaProps
// ): GenerateValidationSchemaReturn => {
//   const sortedItemsIdsMap = sortItemsIdsMap(itemsConfig.itemsIdsMap);
//   const reversedSortedItemsIdsMap = sortedItemsIdsMap.reverse();
//
//   reversedSortedItemsIdsMap.reduce((validationSchemas, itemPath) => {
//     const item = getItem({ itemPath, itemsConfig });
//
//     if (!item?.dataState) {
//       return;
//     }
//
//     let itemValidationSchema: yup.Schema;
//
//     if (item.dataState.type !== FormStateFieldsTypes.tuple) {
//       itemValidationSchema = yup[item.dataState.type]() as yup.Schema;
//     } else {
//       itemValidationSchema = yup[item.dataState.type](
//         item.itemsIds
//           ?.map(createFieldsMap)
//           .filter(Boolean)
//           .map(i =>
//             yup.object().shape(
//               (Array.isArray(i) ? i : [i]).reduce((result, match) => {
//                 return { ...result, ...match };
//               }, {})
//             )
//           ) || []
//       );
//       itemValidationSchema = yup.array().of(
//         yup.object().shape(
//           (
//             fieldConfig as FormStateFieldConfig<
//               SchemaFieldNestedTemplate,
//               SchemaField<SchemaFieldNestedTemplate>
//             >
//           ).fieldsConfigsNames.reduce((shapeOfValidationSchema, fieldConfigName) => {
//             const fieldConfig = fieldsConfig[fieldConfigName];
//             // @ts-ignore
//             shapeOfValidationSchema[fieldConfigName] = generateCastFieldSchema(fieldConfig);
//
//             return shapeOfValidationSchema;
//           }, {} as Record<Extract<keyof SFT, SchemaFieldName>, yup.Schema>)
//         )
//       ) as yup.Schema;
//     }
//
//     if (Reflect.has(fieldConfig, 'defaultValue')) {
//       itemValidationSchema = itemValidationSchema['default'](
//         fieldConfig.defaultValue
//       ) as yup.Schema;
//     }
//
//     if (fieldConfig.validations) {
//       const { validations } = fieldConfig;
//       (Object.keys(validations) as Array<keyof typeof validations>).forEach(validationName => {
//         const validation = validations[validationName];
//
//         itemValidationSchema = addYupValidationToSchema({
//           validationName,
//           validation,
//           yupSchema: itemValidationSchema
//         });
//       });
//     }
//   }, {} as Record<FormValuesFieldPath, yup.Schema>);
// };

export {};
