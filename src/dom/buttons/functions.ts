import { getDomFromReference } from '../getters';

const DISABLED_ATTRIBUTE = 'disabled';

/**
 * Enables the refered button dom
 * @param {String|DOM element} elementReference - reference to the button dom element to be enabled
 */
export const enableHTMLElement = (elementReference: HTMLElement): HTMLElement => {
  const element = getDomFromReference(elementReference);
  element.removeAttribute(DISABLED_ATTRIBUTE);
  return element;
};

/**
 * Disables the refered button dom
 * @param {String||DOM element} elementReference - a reference to the button that will be disabled
 */
export const disableHTMLElement = (elementReference: string | HTMLElement): HTMLElement => {
  const element = getDomFromReference(elementReference);
  element.setAttribute(DISABLED_ATTRIBUTE, '');
  return element;
};
