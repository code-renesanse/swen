
import { errorLog } from '../logger';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOM reference} domRef - reference to the dom element
 */
export const domExists = (domRef: Document | HTMLElement | string): boolean => {
  const tmp = getDomFromReference(domRef);
  return tmp !== null && tmp !== undefined;
};

/**
 * Removes all event listeners from the DOM
 * @param {DOMElement | String} domRef - reference to the dom element
 * @returns DOM element
 */
export const removeEventListener = (domRef: Document | HTMLElement | string): HTMLElement => {
  const dom = getDomFromReference(domRef);

  if (dom.parentNode === null || dom.parentNode === undefined) {
    errorLog('Dom does not have a parent node!');
    return document.createElement('div');
  }

  const elClone = dom.cloneNode(true);
  dom.parentNode.replaceChild(elClone, dom);

  return dom;
};

/**
 * Removes the DOM element from the page
 * @param {DOMElment | String } domRef - reference to the dom; If string then it is an dom ID
 */
export const removeDom = (domRef: Document | HTMLElement | string): boolean => {
  const dom = getDomFromReference(domRef);

  dom.remove();
  return true;
};

/**
 *
 * @param {DOMElement | String} dom
 * @param {String} domId to be set
 * @returns dom id
 */
export const setIdOfDOM = (domRef: Document | HTMLElement | string, domId: string): string => {
  const dom = getDomFromReference(domRef);
  dom.id = domId;
  return domId;
};
