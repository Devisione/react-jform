import { sortItemsIdsMap } from './sortItemsIdsMap';
import { FormStateItemsIdsMap } from '../../../types';

describe('sortItemsIdsMap', () => {
  test('', () => {
    expect(
      sortItemsIdsMap({
        'channels.0.others.0.some': '1',
        'channels.0.others.1.some': '1',
        'channels.1.others.0.some': '1',
        'channels.1': '1',
        'channels.2.others.1.some': '1',
        'channels.0.anothers.0.some': '1',
        'channels.0': '1',
        'channels.0.anothers.1.some': '1',
        'channels.0.anothers.3.some': '1',
        'channels.0.anothers.4.some': '1',
        channels: '1',
        'channels.1.others': '1'
      } as FormStateItemsIdsMap)
    ).toEqual([
      'channels',
      'channels.0',
      'channels.1',
      'channels.1.others',
      'channels.0.anothers.0.some',
      'channels.0.anothers.1.some',
      'channels.0.anothers.3.some',
      'channels.0.anothers.4.some',
      'channels.0.others.0.some',
      'channels.0.others.1.some',
      'channels.1.others.0.some',
      'channels.2.others.1.some'
    ]);
  });
});
