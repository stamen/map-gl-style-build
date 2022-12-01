import { mergeOverrides } from '../merge-overrides';

describe('mergeOverrides', () => {
  test('works with empty overrides', () => {
    const base = { id: 'base' };
    const overrides = {};

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(base);
  });

  test('works with empty base', () => {
    const base = {};
    const overrides = { id: 'overrides' };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(overrides);
  });

  test('works with paint overrides', () => {
    const base = {
      paint: {
        'fill-color': 'red'
      }
    };
    const overrides = {
      paint: {
        'fill-opacity': 0.5
      }
    };

    const expected = {
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5
      }
    };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(expected);
  });

  test('works with layout overrides', () => {
    const base = {
      layout: {
        'line-cap': 'round'
      }
    };
    const overrides = {
      layout: {
        'line-join': 'round'
      }
    };

    const expected = {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(expected);
  });

  test('works with paint overrides, no paint in base', () => {
    const base = {
      id: 'base'
    };
    const overrides = {
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5
      }
    };

    const expected = {
      id: 'base',
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5
      }
    };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(expected);
  });

  test('works with paint overrides, same properties', () => {
    const base = {
      paint: {
        'fill-color': 'green',
        'fill-opacity': 1
      }
    };
    const overrides = {
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5
      }
    };

    const expected = {
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5
      }
    };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(expected);
  });

  test('works with paint overrides, partial properties', () => {
    const base = {
      paint: {
        'fill-color': 'green',
        'fill-opacity': 1
      }
    };
    const overrides = {
      paint: {
        'fill-opacity': 0.5
      }
    };

    const expected = {
      paint: {
        'fill-color': 'green',
        'fill-opacity': 0.5
      }
    };

    const actual = mergeOverrides(base, overrides);
    expect(actual).toEqual(expected);
  });

  test('does not remove undefined properties', () => {
    const base = { id: 'base', paint: { 'line-color': undefined } };
    const overrides = {};

    const actual = mergeOverrides(base, overrides);

    // toStrictEqual doesn't ignore undefined values
    expect(actual).toStrictEqual(base);
  });
});
