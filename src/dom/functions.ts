
import { errorLog } from '../logger';
import { createElement } from './create';
import { _HTMLElement_ } from './dom.model';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOM reference} domRef - reference to the dom element
 */
export const domExists = (domRef: Document | _HTMLElement_ | string): boolean => {
  const tmp = getDomFromReference(domRef);
  return tmp !== null && tmp !== undefined;
};

/**
 * Removes all event listeners from the DOM
 * @param {DOMElement | String} domRef - reference to the dom element
 * @returns DOM element
 */
export const removeEventListener = (domRef: Document | _HTMLElement_ | string): _HTMLElement_ => {
  const dom = getDomFromReference(domRef);

  if (dom.parentNode === null || dom.parentNode === undefined) {
    errorLog('Dom does not have a parent node!');
    return createElement('div', 'err404') as _HTMLElement_;
  }

  const elClone = dom.cloneNode(true);
  dom.parentNode.replaceChild(elClone, dom);

  return dom;
};

/**
 * Removes the DOM element from the page
 * @param {DOMElment | String } domRef - reference to the dom; If string then it is an dom ID
 */
export const removeDom = (domRef: Document | _HTMLElement_ | string): boolean => {
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
export const setIdOfDOM = (domRef: Document | _HTMLElement_ | string, domId: string): string => {
  const dom = getDomFromReference(domRef);
  dom.id = domId;
  return domId;
};
