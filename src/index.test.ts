import * as _all from './index';

describe('Exports', () => {
  it('Checks the number of exports', () => {
    const keys = Object.keys(_all);
    expect(keys.length).toEqual(78);
  });
});
