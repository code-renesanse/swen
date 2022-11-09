import { Application } from '../application';
import { Card } from './card';

describe('Card', () => {
  let instance: Card;
  beforeAll(() => {
    /**
     * Create application instance
     */
    const _apiFrame = document.createElement('div');
    _apiFrame.id = 'api-frame-holder';
    document.body.appendChild(_apiFrame);

    const _app: Application = new Application('test');

    /**
     * Create an model-selection-holder simulated instance
     */
    // TODO: dynamically create model-selection-holder div
    const _holder = document.createElement('div');
    _holder.id = 'model-selection-holder';
    document.body.appendChild(_holder);
    instance = new Card('test-card', _app);
  });

  it('Validates card', () => {
    expect(instance).toBeInstanceOf(Card);
  });
});
