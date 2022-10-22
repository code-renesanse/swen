import { errorLog } from '../../logger';
import { disableHTMLButton, enableHTMLButton } from '../buttons';
import { addClass, removeClass } from '../class';
import { getDomFromReference } from '../getters';

/**
 * Hides the list DOM element
 * @param {Sting | DOMElement} listRef - reference to the list element
 */
export const closeHTMLList = (listRef: string | HTMLElement): void => {
  if (listRef === null) errorLog('No valid list reference');

  //   const list = typeof listRef === 'string' ? document.querySelector(`#${listRef}`) : listRef;
  const list = getDomFromReference(listRef);
  removeClass(list, 'd-flex');
  addClass(list, 'd-none');
};

export const openHTMLList = (listRef: string | HTMLElement): void => {
  if (listRef === null) errorLog('No valid list reference');

  const list = getDomFromReference(listRef);
  removeClass(list, 'd-none');
  addClass(list, 'd-flex');
};

/**
 * Enables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const enableHTMLList = (buttonRef: string | HTMLButtonElement, listRef: string | HTMLElement): void => {
  enableHTMLButton(buttonRef);
  // TODO: implement a getDomListFromReference
  openHTMLList(listRef);
};

/**
 * Disables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const disableHTMLList = (buttonRef: string | HTMLButtonElement, listRef: string | HTMLElement): void => {
  disableHTMLButton(buttonRef);
  // TODO: implement a getDomListFromReference
  closeHTMLList(listRef);
};
