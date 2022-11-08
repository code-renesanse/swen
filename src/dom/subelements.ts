import { errorLog } from '../logger';
import { addClass } from './class';
import { createElement } from './create';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOMElement | String} domRef - reference to the dom element
 * @param  {...DOMElements} list list of DOM elements to append to the parent
 */
export const appendElementList = (domRef: Document | HTMLElement | string, ...list: HTMLElement[]): boolean => {
  const parent = getDomFromReference(domRef);

  if (parent === null || parent === undefined) {
    errorLog('The dom is eather null or undefined');
    return false;
  }

  list.forEach((child: HTMLElement) => {
    parent.appendChild(child);
  });

  return true;
};

/**
   *
   * @returns HTML div element
   */
export const createSubelementsHolder = (id: string): HTMLDivElement => {
  const buttonHolder = createElement('div', id);
  addClass(buttonHolder, [
    'd-flex',
    'flex-column',
    'indent',
    'mx-2'
  ]);
  return buttonHolder;
};
