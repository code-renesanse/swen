import { _Application_ } from './application';

describe('Application', () => {
  let instance: _Application_;
  beforeAll(() => {
    /**
     * Create a simulated api-frame-holder div
     */
    // TODO: dynamicaly create the api-frame-holder div
    const _apiFrame = document.createElement('div');
    _apiFrame.id = 'api-frame-holder';
    document.body.appendChild(_apiFrame);

    instance = new _Application_('test');
  });

  it('Validates the example _application_', () => {
    expect(instance).toBeInstanceOf(_Application_);
    expect(instance.API).toBeDefined();
    expect(instance.API_FRAME).toBeDefined();
    expect(instance.appName).toBeDefined();
  });
});
