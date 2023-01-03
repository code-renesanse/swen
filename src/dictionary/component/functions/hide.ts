import { IApi, ISketchfabModelElement } from '../../../types';
import { elementExists, getElementID } from '../getters';

/**
 *
 * @param {boolean} condition
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export function hide(condition: (key: string) => boolean, api: IApi): boolean {
  for (const key in api.model_dictionary) {
    if (condition(key)) {
      api.hide(api.model_dictionary[key].instanceID);
    }
  }

  return true;
}

/**
 *
 * @param {Object||String} elementReference - reference to the element
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns true
 */
export function hideElement(
  elementReference: ISketchfabModelElement | string,
  api: IApi
): boolean {
  if (elementExists(elementReference, api)) {
    api.hide(getElementID(elementReference, api));
    return true;
  }
  return false;
}

/**
 *
 * @param {array} elementList - element list array
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
// TODO: elementList also work with ISketchfabModelElement array
export function hideElementList(elementList: string[], api: IApi): void {
  elementList = elementList.filter((e: string) => e !== '');

  elementList.forEach((key: string) => {
    if (elementExists(key, api)) {
      hideElement(key, api);
    }
  });
}
