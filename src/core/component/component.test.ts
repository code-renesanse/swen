import { IApi } from '../../types';
import { _Component_ } from './component';
import { IComponent } from './component.model';

describe('Components', () => {
  let instance: IComponent;

  beforeEach(() => {
    const _api: IApi = {
      currentModelId: '',
      image_dictionary: {},
      model_dictionary: {},
      model_map: {},
      configuration: {},
      animation_speed: 0,
      languages: {},
      translator: {
        test: 'test'
      },
      configuration_components: [],
      is_mobile: false,
      component_load_map: {
        test: () => {
          console.log('Test component initialization works');
        }
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
      getSceneGraph: function (_fun: (err: object, graph: object) => void | Promise<void>): void | Promise<void> {
        throw new Error('Function not implemented.');
      },
      addEventListener: function (_type: string, _fun: () => void | Promise<void>): void {
        throw new Error('Function not implemented.');
      }
    };
    const dock = document.createElement('div');
    dock.id = 'dock-wrapper';
    document.body.appendChild(dock);
    instance = new _Component_('test', _api);
  });

  it('works', () => {
    expect(instance).toBeInstanceOf(_Component_);
    expect(instance.getComponentName()).toEqual('test');
    expect(instance.id).toBeDefined();
    expect(instance.title).toBeDefined();
    expect(instance.name).toBeDefined();
    expect(instance.dockElement).toBeDefined();
    expect(instance.content).toBeDefined();
    expect(instance.subelements).toBeDefined();
  });
});
