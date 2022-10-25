
import { IApi, ISketchfabModelElement } from '../../../types';
import { elementExists, getElementID } from '../getters';

/**
 *
 * @param {Object||String} elementReference - reference to the element
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns true
 */
export function showElement (elementReference: ISketchfabModelElement | string, api: IApi): boolean {
  if (elementExists(elementReference, api)) {
    api.show(getElementID(elementReference, api));
    return true;
  }
  return false;
};

/**
 *
 * @param {array} elementList - element list array
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
// TODO: implement the elementList as an array of ISketchfabModelElement
export function showElementList (elementList: string[], api: IApi): void {
  elementList = elementList.filter((e: any) => e !== '');

  elementList.forEach((key: any) => {
    if (elementExists(key, api)) {
      showElement(key, api);
    }
  });
};
