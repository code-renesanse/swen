import { developmentLog } from '../../logger';
import { Dictionary, SketchfabModelElement } from '../../types';

/**
 * Builds a dictioanry of all blend components so that then can be referenced later
 * @param {3D element array} graph
 * @returns promise resolve
 */
export async function buildComponentDictionary (graph: any): Promise<Dictionary<SketchfabModelElement>> {
  return await new Promise((resolve) => {
    const componentDictionary = {};

    developmentLog('Started building model element dicitironary.');
    const dictioanry: Dictionary<SketchfabModelElement> = {};

    const elements = graph.children[0].children;
    elements.forEach((e: SketchfabModelElement) => {
      if (e.name === '' || e.name === null || e.name === undefined) {
        developmentLog(`${e.instanceID} has no name!`);
        return;
      }
      const n = e.name.split('_')[0];
      dictioanry[n] = e;
    });

    return resolve(componentDictionary);
  });
};
