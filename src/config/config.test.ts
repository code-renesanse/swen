import { getConfigFromKey, setConfigKeyValuePair } from '.';
import { IApi } from '../types';

describe('Configuration', () => {
  let _api: IApi;
  let _key: string;
  let _value: { test: string };

  beforeAll(() => {
    _api = {
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
  });

  beforeEach(() => {
    _key = 'test';
    _value = { test: 'test' };
  });

  it('Sets a key-value pair', () => {
    const _insert = setConfigKeyValuePair(_key, _value, _api);

    expect(_insert).toBeInstanceOf(Object);
    expect(_insert).toHaveProperty('test');
    expect(_insert).toMatchObject(_value);
  });

  it('Gets a value from key', () => {
    const _result = getConfigFromKey(_key, _api);

    expect(_result).toBeInstanceOf(Object);
    expect(_result).toHaveProperty('test');
    expect(_result).toMatchObject(_value);
  });
});
