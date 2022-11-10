import { _HTMLElement_ } from '../dom.model';
import { getDomFromReference } from '../getters';

/**
 *
 * @param {DOMElement | String} domRef - reference to the dom element
 * @returns
 */
export const clearAnimation = (domRef: string | _HTMLElement_): boolean => {
  const dom = getDomFromReference(domRef);
  dom.style.animation = '';
  return true;
};
