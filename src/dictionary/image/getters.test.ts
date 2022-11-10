import { IApi } from '../../types';
import { getImage } from './getters';

describe('Image Dictionary', () => {
  let _api: IApi;

  beforeAll(() => {
    _api = {
      currentModelId: '',
      image_dictionary: {
        test: 'white'
      },
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
  });

  it('Get\'s an image from dictionary', () => {
    const key = '';
    const image = getImage(key, _api);
    expect(image).toBeDefined();
  });
});
