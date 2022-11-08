import { Application } from './application';

describe('Application', () => {
  let instance: Application;
  beforeAll(() => {
    /**
     * Create a simulated api-frame-holder div
     */
    // TODO: dynamicaly create the api-frame-holder div
    const _apiFrame = document.createElement('div');
    _apiFrame.id = 'api-frame-holder';
    document.body.appendChild(_apiFrame);

    instance = new Application('test');
  });

  it('Validates the example application', () => {
    expect(instance).toBeInstanceOf(Application);
    expect(instance.API).toBeDefined();
    expect(instance.API_FRAME).toBeDefined();
    expect(instance.appName).toBeDefined();
  });
});
