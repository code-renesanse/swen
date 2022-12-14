import { createElement } from './create';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DOMElement | String} domRef - reference to the dom element
 * @param  {...DOMElements} list list of DOM elements to append to the parent
 * @returns the html element that the given elements were appended
 */
export const appendElementList = (domRef: HTMLElement | string, ...list: HTMLElement[]): HTMLElement => {
  const parent = getDomFromReference(domRef);

  list.forEach((child: HTMLElement) => {
    parent.appendChild(child);
  });

  return parent;
};

/**
 * DEPRICATED: remove because you can just use createElement(Div)
 * @returns HTML div element
 */
export const createSubelementsHolder = (id: string): HTMLElement => {
  const buttonHolder = createElement('div', id);
  return buttonHolder;
};
