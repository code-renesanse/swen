import { errorLog } from '../../logger';
import { disableHTMLElement, enableHTMLElement } from '../buttons';
import { getDomFromReference } from '../getters';

/**
 * Hides the list DOM element
 * @param {Sting | DOMElement} listRef - reference to the list element
 */
export const closeHTMLList = (listRef: string | HTMLElement): void => {
  if (listRef === null) errorLog('No valid list reference');

  const list = getDomFromReference(listRef);
  if (!list.classList.contains('visually-hidden')) {
    list.classList.add('visually-hidden');
  }
};

export const openHTMLList = (listRef: string | HTMLElement): void => {
  if (listRef === null) errorLog('No valid list reference');

  const list = getDomFromReference(listRef);
  if (list.classList.contains('visually-hidden')) {
    list.classList.remove('visually-hidden');
  }
};

/**
 * Enables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const enableHTMLList = (buttonRef: HTMLButtonElement, listRef: string | HTMLElement): void => {
  enableHTMLElement(buttonRef);
  openHTMLList(listRef);
};

/**
 * Disables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const disableHTMLList = (buttonRef: HTMLElement | string, listRef: HTMLElement | string): void => {
  disableHTMLElement(buttonRef);
  // TODO: implement a getDomListFromReference
  closeHTMLList(listRef);
};
