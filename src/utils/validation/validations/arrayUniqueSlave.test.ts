import { arrayUniqueSlave } from './arrayUniqueSlave';
import { SchemaFieldTypes } from '../../../types';

type SchemaArrayTestTemplate = {
  type: SchemaFieldTypes.array;
  fields: {
    ruleType: {
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

describe('uniqueSlave', () => {
  test('', () => {
    expect(
      arrayUniqueSlave<SchemaArrayTestTemplate>(
        [
          {
            ruleType: 'onEnd',
            channels: [
              {
                channel: 'id1'
              },
              {
                channel: 'id2'
              }
            ]
          },
          {
            ruleType: 'onEnd',
            channels: [{ channel: 'id1' }]
          }
        ],
        {
          masterProp: 'ruleType',
          slaveProp: 'channels',
          slavePropMapper: 'channel'
        }
      )
    ).toBe(false);
  });
  test('', () => {
    expect(
      arrayUniqueSlave<SchemaArrayTestTemplate>(
        [
          {
            ruleType: 'onEnd',
            channels: [
              {
                channel: 'id1'
              },
              {
                channel: 'id2'
              }
            ]
          },
          {
            ruleType: 'onEnd',
            channels: [{ channel: 'id3' }]
          }
        ],
        {
          masterProp: 'ruleType',
          slaveProp: 'channels',
          slavePropMapper: 'channel'
        }
      )
    ).toBe(true);
  });
});
