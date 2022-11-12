
import * as logger from '.';

describe('functions', () => {
  it('works', () => {
    expect(logger.developmentLog('test')).toEqual('');

    expect(logger.developmentLog('test').toString()).toBeDefined();
  });
});
