import { IApi } from '../../types';
import { buildComponentDictionary } from './build';
import { elementExists, find, findAll, getElementID } from './getters';

describe('Component dictionary', () => {
  let _api: IApi;
  let _graph: object;

  beforeAll(() => {
    // TODO: example API
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

    // TODO: example graph
    _graph = {
      children: [ {
        children: [
          {
            name: 'CMP001_part001',
            instanceID: 'test-id'
          },
          {
            name: 'CMP002_part002'
          }
        ]
      } ]
    };
  });

  it('Build dictionary', async () => {
    const _result = await buildComponentDictionary(_graph);

    expect(_result).toBeDefined();

    _api.model_dictionary = _result;

    expect(_api.model_dictionary).toMatchObject(_result);
  });

  it('Check if element CMP001 exists', () => {
    const _result = elementExists('CMP001', _api);
    expect(_result).toBe(true);
  });

  it('Check if element CMP003 exists (should throw and error)', () => {
    // This is done like so that the function returns void
    const _result = (): void => {
      elementExists('CMP003', _api);
    };
    expect(_result).toThrow('[ testing ]: Element with index \'CMP003\' does not exist');
  });

  it('Find one', () => {
    const _result = find('CMP001', _api);
    expect(_result).toBeDefined();

    const _result2 = (): void => {
      find('CMP003', _api);
    };
    expect(_result2).toThrowError();
  });

  it('Find all', () => {
    const _result = findAll('CMP', _api);
    expect(_result.length).toEqual(2);

    const _result2 = findAll('KMP', _api);
    expect(_result2).toHaveLength(0);
  });

  it('Get element id', () => {
    const _result = getElementID('CMP001', _api);
    expect(_result).toMatch('test-id');

    const _result2 = (): void => { getElementID('CMP003', _api); };
    expect(_result2).toThrowError();
  });
});
