import { getConfigFromKey, setConfigKeyValuePair } from '.';
import { IApi } from '../types';

describe('Configuration', () => {
  let api: IApi;
  let key: string;
  let value: { test: string };

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
        test: 'test',
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
  });

  beforeEach(() => {
    key = 'test';
    value = { test: 'test' };
  });

  it('Sets a key-value pair', () => {
    const insert = setConfigKeyValuePair(key, value, api);

    expect(insert).toBeInstanceOf(Object);
    expect(insert).toHaveProperty('test');
    expect(insert).toMatchObject(value);
  });

  it('Gets a value from key', () => {
    const result = getConfigFromKey(key, api);

    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('test');
    expect(result).toMatchObject(value);
  });
});
