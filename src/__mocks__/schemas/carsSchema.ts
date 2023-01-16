import { Schema, SchemaFieldTypes, SchemaRules } from '../../types';
import { brands, brandsToModels, brandsFromGermany } from '../constants';

export type CarsSchemaFieldsTemplate = {
  orders: {
    type: SchemaFieldTypes.array;
    fields: {
      brand: {
        type: SchemaFieldTypes.string;
      };
      model: {
        type: SchemaFieldTypes.string;
      };
      madeInGermany: {
        type: SchemaFieldTypes.boolean;
      };
    };
  };
};

export const carsSchema: Schema<CarsSchemaFieldsTemplate> = {
  fields: {
    orders: {
      type: 'array',
      defaultValue: [],
      fields: {
        brand: {
          type: 'string',
          defaultValue: brands[0],
          validations: {
            required: true,
            oneOf: [...brands]
          }
        },
        model: {
          type: 'string',
          defaultValue: brandsToModels[brands[0]][0],
          validations: {
            required: true,
            oneOf: [...brandsToModels[brands[0]]]
          }
        },
        madeInGermany: {
          type: 'boolean'
        }
      }
    }
  },
  conditions: {
    model: [
      {
        watchedField: 'brand',
        rules: brands.reduce((allRules, brand) => {
          const models = brandsToModels[brand];

          allRules.push({
            is: brand,
            then: {
              defaultValue: models[0],
              value: models[0],
              validations: {
                oneOf: [...models]
              }
            }
          });

          return allRules;
        }, [] as SchemaRules<CarsSchemaFieldsTemplate['orders']['fields']['brand']>)
      }
    ],
    madeInGermany: [
      {
        watchedField: 'brand',
        rules: brands.reduce((allRules, brand) => {
          // @ts-ignore
          if (brandsFromGermany.includes(brand)) {
            allRules.push({
              is: brand,
              then: {
                defaultValue: false,
                value: false
              }
            });
          } else {
            allRules.push({
              is: brand,
              then: {
                defaultValue: undefined,
                value: undefined
              }
            });
          }

          return allRules;
        }, [] as SchemaRules<CarsSchemaFieldsTemplate['orders']['fields']['madeInGermany']>)
      }
    ]
  }
};
