import { Application } from './application';

describe('Application', () => {
  let instance: Application;
  beforeAll(() => {
    /**
     * Create a simulated api-frame-holder div
     */
    // TODO: dynamicaly create the api-frame-holder div
    const apiFrame = document.createElement('div');
    apiFrame.id = 'api-frame-holder';
    document.body.appendChild(apiFrame);

    instance = new Application('test');
  });

  it('Validates the example Application', () => {
    expect(instance).toBeInstanceOf(Application);
    expect(instance.API).toBeUndefined();
    expect(instance.API_FRAME).toBeDefined();
    expect(instance.appName).toBeDefined();
  });
});
