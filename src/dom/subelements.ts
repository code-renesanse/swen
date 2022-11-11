import { errorLog } from '../logger';
import { createElement } from './create';
import { _HTMLElement_ } from './dom.model';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOMElement | String} domRef - reference to the dom element
 * @param  {...DOMElements} list list of DOM elements to append to the parent
 */
export const appendElementList = (domRef: Document | _HTMLElement_ | string, ...list: _HTMLElement_[]): boolean => {
  const parent = getDomFromReference(domRef);

  if (parent === null || parent === undefined) {
    errorLog('The dom is eather null or undefined');
    return false;
  }

  list.forEach((child: _HTMLElement_) => {
    parent.appendChild(child);
  });

  return true;
};

/**
   *
   * @returns HTML div element
   */
export const createSubelementsHolder = (id: string): _HTMLElement_ => {
  const buttonHolder = createElement('div', id);
  buttonHolder.addClass(
    'd-flex',
    'flex-column',
    'mx-2'
  );
  return buttonHolder;
};
