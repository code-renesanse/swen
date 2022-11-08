
import * as logger from '.';

describe('functions', () => {
  it('works', () => {
    // Testing if it development works when not in development mode
    expect(logger.developmentLog('test')).toEqual('');

    // Testing if it development works when in development mode
    process.env.NODE_ENV = 'development';
    expect(logger.developmentLog('test').toString()).toContain(`[ ${process.env.APP_NAME ?? 'test'} ]`);
  });
});
