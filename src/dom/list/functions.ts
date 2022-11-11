import { errorLog } from '../../logger';
import { disableHTMLButton, enableHTMLButton } from '../buttons';
import { _HTMLElement_ } from '../dom.model';
import { getDomFromReference } from '../getters';

/**
 * Hides the list DOM element
 * @param {Sting | DOMElement} listRef - reference to the list element
 */
export const closeHTMLList = (listRef: string | _HTMLElement_): void => {
  if (listRef === null) errorLog('No valid list reference');

  //   const list = typeof listRef === 'string' ? document.querySelector(`#${listRef}`) : listRef;
  const list = getDomFromReference(listRef);
  // list.removeClass('d-flex');
  // list.addClass('d-none');
  list.style.display = 'none';
};

export const openHTMLList = (listRef: string | _HTMLElement_): void => {
  if (listRef === null) errorLog('No valid list reference');

  const list = getDomFromReference(listRef);
  // list.removeClass('d-none');
  // list.addClass('d-flex');
  list.style.display = 'flex';
};

/**
 * Enables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const enableHTMLList = (buttonRef: string | HTMLButtonElement, listRef: string | _HTMLElement_): void => {
  enableHTMLButton(buttonRef);
  // TODO: implement a getDomListFromReference
  openHTMLList(listRef);
};

/**
 * Disables and closes the refered list dom
 * @param {String|DOM element} buttonRef - reference to the list display button dom
 * @param {*} listRef - reference to the list dom
 */
export const disableHTMLList = (buttonRef: string | HTMLButtonElement, listRef: string | _HTMLElement_): void => {
  disableHTMLButton(buttonRef);
  // TODO: implement a getDomListFromReference
  closeHTMLList(listRef);
};
