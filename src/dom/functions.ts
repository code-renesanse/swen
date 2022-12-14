
import { errorLog } from '../logger';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOM reference} domReference - reference to the dom element
 */
export const domExists = (domReference: HTMLElement | string): boolean => {
  const tmp = getDomFromReference(domReference);
  return tmp !== null && tmp !== undefined;
};

/**
 * Removes all event listeners from the DOM
 * @param {DOMElement | String} domReference - reference to the dom element
 * @returns DOM element
 */
export const removeEventListener = (domReference: HTMLElement | string): HTMLElement | string => {
  const dom = getDomFromReference(domReference);

  if (dom.parentNode === null || dom.parentNode === undefined) {
    errorLog('Dom does not have a parent node!');
    return document.createElement('p');
  }

  const elClone = dom.cloneNode(true);
  dom.parentNode.replaceChild(elClone, dom);

  return dom;
};

/**
 * Removes the DOM element from the page
 * @param {DOMElment | String } domReference - reference to the dom; If string then it is an dom ID
 */
export const removeDom = (domReference: HTMLElement | string): HTMLElement | string => {
  const dom = getDomFromReference(domReference);
  dom.remove();
  return domReference;
};

/**
 *
 * @param {DOMElement | String} domReference
 * @param {String} domId to be set
 * @returns dom id
 */
export const setIdOfDOM = (domReference: HTMLElement | string, domId: string): string => {
  const dom = getDomFromReference(domReference);
  dom.id = domId;
  return domId;
};
