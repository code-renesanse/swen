import { createEmptyWrapper } from '../../dom/wrapper';
import { Component } from './component';
import { IApi } from '../../types';
import { ComponentSchema } from './component.schema';
import { createHTMLButton, showSelection } from '../../dom';

class TestSchema extends ComponentSchema {
  createButton(api: IApi) {
    const exampleButton = createHTMLButton('exampleButton', '', api);
    return exampleButton;
  }
}

class TestComponent extends Component {
  constructor() {
    super('test');
  }

  setup(api: IApi) {
    const schema: TestSchema = new TestSchema(this);

    const button = schema.createButton(api);

    showSelection(button, 'test-parent');

    return {
      button,
    };
  }
}

describe('Components', () => {
  let api: IApi;
  let dock: HTMLDivElement;

  beforeAll(() => {
    api = {
      currentModelId: '',
      image_dictionary: {},
      model_dictionary: {},
      model_map: {},
      configuration: {},
      animation_speed: 0,
      languages: {},
      translator: {
        'test-list-item-button': 'test',
        exampleButton: 'exampleButton',
      },
      is_mobile: false,
      component_load_map: {
        test: new TestComponent(),
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
    dock = createEmptyWrapper();
    document.body.appendChild(dock);
  });

  it('creates', () => {
    Object.keys(api.component_load_map).forEach((key) => {
      const component = api.component_load_map[key];

      expect(component).toBeInstanceOf(Component);
      expect(component.getComponentName()).toEqual('test');
    });
  });

  it('sets up', () => {
    Object.keys(api.component_load_map).forEach((key) => {
      const component = api.component_load_map[key];

      component.setup(api);
    });
  });

  it('renders', () => {
    Object.keys(api.component_load_map).forEach((key) => {
      const component = api.component_load_map[key];

      component.render(api);
    });
  });

  it('test', () => {
    console.log(dock.innerHTML);
  });
});
