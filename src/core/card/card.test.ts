import { Application } from '../application';
import { Card } from './card';

let instance: Card;

beforeAll(() => {
  /**
   * Create application instance
   */
  const apiFrame = document.createElement('div');
  apiFrame.id = 'api-frame-holder';
  document.body.appendChild(apiFrame);

  const app: Application = new Application('test');
  app.API = {
    currentModelId: '',
    image_dictionary: {},
    model_dictionary: {},
    model_map: {},
    configuration: {},
    animation_speed: 0,
    languages: {},
    translator: {
      'card-button-test-card': 'test-card',
    },
    configuration_components: [],
    is_mobile: false,
    component_load_map: {
      test: () => {
        console.log('Test component initialization works');
      },
    },
    show: function (_id: string): void {
      throw new Error('Function not implemented.');
    },
    hide: function (_id: string): void {
      throw new Error('Function not implemented.');
    },
    start: function (_fun: () => void): void {
      throw new Error('Function not implemented.');
    },
    getSceneGraph: function (
      _fun: (err: object, graph: object) => void | Promise<void>
    ): void | Promise<void> {
      throw new Error('Function not implemented.');
    },
    addEventListener: function (
      _type: string,
      _fun: () => void | Promise<void>
    ): void {
      throw new Error('Function not implemented.');
    },
  };

  /**
   * Create an model-selection-holder simulated instance
   */
  // TODO: dynamically create model-selection-holder div
  const holder = document.createElement('div');
  holder.id = 'model-selection-holder';
  document.body.appendChild(holder);
  instance = new Card('Load test-card', 'test-card', app);
});

describe('Card', () => {
  it('Validates card', () => {
    expect(instance).toBeInstanceOf(Card);
  });
});
