import { createEmptyWrapper } from '../../dom/wrapper';
// import { IApi } from '../../types';
import ComponentSchema from './component.schema';

describe('Components', () => {
  let instance: ComponentSchema;

  beforeAll(() => {
    // const api: IApi = {
    //   currentModelId: '',
    //   image_dictionary: {},
    //   model_dictionary: {},
    //   model_map: {},
    //   configuration: {},
    //   animation_speed: 0,
    //   languages: {},
    //   translator: {
    //     test: 'test',
    //   },
    //   configuration_components: [],
    //   is_mobile: false,
    //   component_load_map: {
    //     test: () => {
    //       console.log('Test component initialization works');
    //     },
    //   },
    //   show: function (_id: string): void {
    //     throw new Error('Function not implemented.');
    //   },
    //   hide: function (_id: string): void {
    //     throw new Error('Function not implemented.');
    //   },
    //   start: function (_fun: () => void): void {
    //     throw new Error('Function not implemented.');
    //   },
    //   getSceneGraph: function (
    //     _fun: (err: object, graph: object) => void | Promise<void>
    //   ): void | Promise<void> {
    //     throw new Error('Function not implemented.');
    //   },
    //   addEventListener: function (
    //     _type: string,
    //     _fun: () => void | Promise<void>
    //   ): void {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    const dock = createEmptyWrapper();
    document.body.appendChild(dock);

    instance = new ComponentSchema('test');

    instance.setup = () => {
      const exampleButton = document.createElement('button');
      exampleButton.textContent = 'example';

      return {
        exampleButton,
      };
    };
  });

  it('works', () => {
    expect(instance).toBeInstanceOf(ComponentSchema);
    expect(instance.getComponentName()).toEqual('test');
  });

  it('renderes', () => {
    expect(instance.render()).toHaveProperty('id');
    expect(instance.render().id).toEqual('test-list-item');
  });
});
