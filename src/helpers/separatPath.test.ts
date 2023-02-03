import { separatePath } from './separatePath';

describe('separathPath', () => {
  test('empty', () => {
    expect(separatePath('')).toEqual({
      tail: '',
      head: '',
      tailParts: []
    });
  });
});
