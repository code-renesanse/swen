import { _Application_ } from '../application';
import { _Card_ } from './card';

describe('Card', () => {
  let instance: _Card_;
  beforeAll(() => {
    /**
     * Create application instance
     */
    const _apiFrame = document.createElement('div');
    _apiFrame.id = 'api-frame-holder';
    document.body.appendChild(_apiFrame);

    const _app: _Application_ = new _Application_('test');

    /**
     * Create an model-selection-holder simulated instance
     */
    // TODO: dynamically create model-selection-holder div
    const _holder = document.createElement('div');
    _holder.id = 'model-selection-holder';
    document.body.appendChild(_holder);
    instance = new _Card_('test-card', 'Load test-card', _app);
  });

  it('Validates card', () => {
    expect(instance).toBeInstanceOf(_Card_);
  });
});
