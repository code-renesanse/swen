import { developmentLog, errorLog } from '../../logger';
import { IApi, ISketchfabModelElement } from '../../types';

/**
 * Function checks if the given element exists
 * @param {Object||String} elementReference - reference to the element
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns boolean
 */
export function elementExists(
  elementReference: ISketchfabModelElement | string,
  api: IApi
): boolean {
  const key: string =
    typeof elementReference === 'object'
      ? elementReference.name
      : typeof elementReference === 'string'
      ? elementReference
      : '';

  const component: ISketchfabModelElement = api.model_dictionary[key];

  if (key === '' || component === null || component === undefined) {
    errorLog(`Element with index '${key}' does not exist`);
  }

  return component !== null;
}

/**
 * Finds the first element that satisfies the key given
 * @param {string} key -  key for search
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns ISketchfabModelElement
 */
export function find(key: string, api: IApi): ISketchfabModelElement {
  for (const elementId in api.model_dictionary) {
    if (elementId.includes(key)) return api.model_dictionary[elementId];
  }

  errorLog(`Element with key: '${key}' does not exsist`);
  return {
    instanceID: 'error 404',
    name: 'error 404',
  };
}

/**
 * Finds all elements that satisfy the key given
 * @param {string} key -  key for search
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns ISketchfabModelElement[]
 */
export function findAll(key: string, api: IApi): ISketchfabModelElement[] {
  const out: ISketchfabModelElement[] = [];

  for (const elementId in api.model_dictionary) {
    if (elementId.includes(key)) {
      out.push(api.model_dictionary[elementId]);
    }
  }

  if (out.length <= 0) {
    developmentLog(`There were no elements found with the key ${key}`);
  }

  return out;
}

/**
 * For getting the ID of the ISketchfabModelElement
 * @param {String | Object} elementRef - element key | object
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns string
 */
export function getElementID(
  elementRef: ISketchfabModelElement | string,
  api: IApi
): string {
  const key: string =
    typeof elementRef === 'object' ? elementRef.name : elementRef;

  if (key === '') {
    errorLog(`Element with key ${key} does not exist!`);
    return 'error 404';
  }

  const ref: ISketchfabModelElement = api.model_dictionary[key];

  if (ref === null || ref === undefined) {
    errorLog(`Element with key ${key} does not exist!`);
    return 'error 404';
  }

  return ref.instanceID;
}
