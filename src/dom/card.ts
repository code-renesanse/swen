// TODO: handle card load holder styles
import { createElement } from './create';

/**
 *
 * @param {String} id
 * @param {String} title
 * @returns LI HTML element
 */
export const createCardLoadHolder = (id: string, title: string): HTMLLIElement => {
  const cardHolder = createElement('li', id);
  cardHolder.addClass('card-holder');
  cardHolder.title = title;
  return cardHolder;
};
