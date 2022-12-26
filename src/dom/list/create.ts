import { createElement } from '../create';

/**
 *
 * @param {String} listName
 * @returns HTML unorganized list
 */
export const createHTMLList = (listName: string): HTMLUListElement => {
  const out = createElement('ul', listName);
  out.className = 'swen-list';
  return out;
};
