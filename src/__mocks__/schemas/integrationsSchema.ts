import { Schema, SchemaFieldTypes } from '../../types';

export type IntegrationsSchemaFieldsTemplate = {
  integrations: {
    type: SchemaFieldTypes.array;
    fields: {
      isActive: {
        type: SchemaFieldTypes.boolean;
      };
      name: {
        type: SchemaFieldTypes.string;
      };
      ruleType: {
        type: SchemaFieldTypes.string;
      };
      ruleAction: {
        type: SchemaFieldTypes.string;
      };
      channels: {
        type: SchemaFieldTypes.array;
        fields: {
          channel: {
            type: SchemaFieldTypes.string;
          };
        };
      };
    };
  };
};

const integrationsSchema: Schema<IntegrationsSchemaFieldsTemplate> = {
  fields: {
    integrations: {
      type: 'array',
      validations: {
        min: 1,
        arrayUniqueSlave: {
          masterProp: 'ruleType',
          slaveProp: 'channels',
          slavePropMapper: 'channel'
        }
      },
      fields: {
        isActive: {
          type: 'boolean',
          defaultValue: false
        },
        name: {
          type: 'string',
          validations: {
            required: true
          }
        },
        ruleType: {
          type: 'string',
          defaultValue: 'AFKBSearchFinished',
          validations: {
            required: true,
            oneOf: [
              'AFKBSearchFinished',
              'NewConversationCreatedByOperator',
              'ConversationClosedByOperator'
            ]
          }
        },
        channels: {
          type: 'array',
          validations: {
            min: 1
          },
          fields: {
            channel: {
              type: 'string',
              validations: {
                required: true,
                oneOf: ['telegram', 'widget']
              }
            }
          }
        },
        ruleAction: {
          type: 'string',
          defaultValue: 'RunScenarioAndContinueProcessing'
        }
      }
    }
  },
  conditions: {
    channels: [
      {
        watchedField: 'ruleType',
        rules: [
          {
            is: '',
            then: {
              defaultValue: undefined,
              value: undefined
            }
          }
        ]
      }
    ]
  }
};

export default integrationsSchema;
