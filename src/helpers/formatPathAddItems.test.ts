import { formatPathAddItems } from './formatPathAddItems';

describe('formatPathAddItems', () => {
  test('one field', () => {
    expect(formatPathAddItems('some')).toBe('some');
  });
  test('one field with numbers', () => {
    expect(formatPathAddItems('some1')).toBe('some1');
  });
  test('nested field', () => {
    expect(formatPathAddItems('some.foo')).toBe('some.foo');
  });
  test('nested with one array deep', () => {
    expect(formatPathAddItems('others.0.some')).toBe('others.items.0.some');
  });
  test('nested with one array deep and set items', () => {
    expect(formatPathAddItems('others.0.some', 'fields')).toBe('others.fields.0.some');
  });
  test('nested with two arrays deep', () => {
    expect(formatPathAddItems('others.0.some.0.foo')).toBe('others.items.0.some.items.0.foo');
  });

  test('nested with long index and one array deep', () => {
    expect(formatPathAddItems('others.123456789.some')).toBe('others.items.123456789.some');
  });
  test('nested with long index and two array deep', () => {
    expect(formatPathAddItems('others.123456789.some.123456789.foo')).toBe(
      'others.items.123456789.some.items.123456789.foo'
    );
  });
});
