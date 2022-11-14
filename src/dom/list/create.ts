import { createElement } from '../create';

/**
 *
 * @param {String} listName
 * @returns HTML unorganized list
 */
export const createHTMLList = (listName: string): HTMLUListElement => {
  const out = createElement('ul', listName);
  out.className = 'swen-list';
  // // out.addClass(
  // //   'd-flex',
  // //   'flex-wrap',
  // //   'color-list',
  // //   'p-0'
  // );
  return out;
};
