import { getDomFromReference } from '../getters';

/**
 * Enables the refered button dom
 * @param {String|DOM element} elementReference - reference to the button dom element to be enabled
 */
export const enableHTMLElement = (elementReference: HTMLElement): HTMLElement => {
  const element = getDomFromReference(elementReference);
  element.classList.remove('disabled');
  return element;
};

/**
 * Disables the refered button dom
 * @param {String||DOM element} elementReference - a reference to the button that will be disabled
 */
export const disableHTMLElement = (elementReference: string | HTMLElement): HTMLElement => {
  const element = getDomFromReference(elementReference);
  element.classList.add('disabled');
  return element;
};
