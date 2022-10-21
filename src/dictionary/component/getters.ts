import { developmentLog, errorLog } from '../../logger';
import { API, SketchfabModelElement } from '../../types';

/**
 * Function checks if the given element exists
 * @param {Object||String} elementReference - reference to the element
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns boolean
 */
export function elementExists (elementReference: SketchfabModelElement | string, api: API): boolean {
  const key: string = typeof elementReference === 'object' ? elementReference.name : typeof elementReference === 'string' ? elementReference : '';

  const component: SketchfabModelElement = api.componentDictionary[key];

  if (key === '' || component === null || component === undefined) {
    errorLog(`Element with index '${key}' does not exist`);
    return false;
  }

  return component !== null;
};

/**
 * Finds the first element that satisfies the key given
 * @param {string} key -  key for search
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns SketchfabModelElement
 */
export function find (key: string, api: API): SketchfabModelElement {
  for (const elementId in api.componentDictionary) {
    if (elementId.includes(key)) return api.componentDictionary[elementId];
  }

  errorLog(`Element with key: '${key}' does not exsist`);
  return {
    instanceID: 'error 404',
    name: 'error 404'
  };
};

/**
 * Finds all elements that satisfy the key given
 * @param {string} key -  key for search
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns SketchfabModelElement[]
 */
export function findAll (key: string, api: API): SketchfabModelElement[] {
  const out: SketchfabModelElement[] = [];

  for (const elementId in api.componentDictionary) {
    if (elementId.includes(key)) {
      out.push(api.componentDictionary[elementId]);
    }
  }

  if (out.length <= 0) {
    developmentLog(`There were no elements found with the key ${key}`);
  }

  return out;
};

/**
 * For getting the ID of the SketchfabModelElement
 * @param {String | Object} elementRef - element key | object
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns string
 */
export function getElementID (elementRef: SketchfabModelElement | string, api: API): string {
  const key: string = typeof elementRef === 'object' ? elementRef.name : elementRef;

  if (key === '') {
    errorLog(`Element with key ${key} does not exist!`);
    return 'error 404';
  }

  const ref: SketchfabModelElement = api.componentDictionary[key];

  if (ref === null || ref === undefined) {
    errorLog(`Element with key ${key} does not exist!`);
    return 'error 404';
  }

  return ref.instanceID;
};
