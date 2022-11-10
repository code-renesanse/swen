import { createElement } from './create';

/**
 *
 * @param {String} id
 * @param {String} title
 * @returns DIV HTML element
 */
export const createCardLoadHolder = (id: string, title: string): HTMLDivElement => {
  const cardHolder = createElement('div', id);
  cardHolder.addClass(
    'w-20r',
    'mx-2',
    'my-2',
    'on-hove',
    'shadow-lg',
    'border',
    'border-dark',
    'border-3'
  );
  cardHolder.title = title;
  return cardHolder;
};
