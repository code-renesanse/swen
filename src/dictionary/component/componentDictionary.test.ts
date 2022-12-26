import { IApi } from '../../types';
import { buildComponentDictionary } from './build';
import { elementExists, find, findAll, getElementID } from './getters';

describe('Component dictionary', () => {
  let api: IApi;
  let graph: object;

  beforeAll(() => {
    // TODO: example API
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

    // TODO: example graph
    graph = {
      children: [
        {
          children: [
            {
              name: 'CMP001_part001',
              instanceID: 'test-id',
            },
            {
              name: 'CMP002_part002',
            },
          ],
        },
      ],
    };
  });

  it('Build dictionary', async () => {
    const result = await buildComponentDictionary(graph);

    expect(result).toBeDefined();

    api.model_dictionary = result;

    expect(api.model_dictionary).toMatchObject(result);
  });

  it('Check if element CMP001 exists', () => {
    const result = elementExists('CMP001', api);
    expect(result).toBe(true);
  });

  it('Check if element CMP003 exists (should throw and error)', () => {
    // This is done like so that the function returns void
    const result = (): void => {
      elementExists('CMP003', api);
    };
    // expect(result).toThrow(`[ ${process.env.APP_NAME ?? 'swen'} ]: Element with index 'CMP003' does not exist`);
    expect(result).toThrowError();
  });

  it('Find one', () => {
    const result = find('CMP001', api);
    expect(result).toBeDefined();

    const result2 = (): void => {
      find('CMP003', api);
    };
    expect(result2).toThrowError();
  });

  it('Find all', () => {
    const result = findAll('CMP', api);
    expect(result.length).toEqual(2);

    const result2 = findAll('KMP', api);
    expect(result2).toHaveLength(0);
  });

  it('Get element id', () => {
    const result = getElementID('CMP001', api);
    expect(result).toMatch('test-id');

    const result2 = (): void => {
      getElementID('CMP003', api);
    };
    expect(result2).toThrowError();
  });
});
