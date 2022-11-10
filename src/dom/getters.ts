import { errorLog } from '../logger';
import { createElement } from './create';
import { _HTMLElement_ } from './dom.model';

/**
 *
 * @param {DOM Element || String} domRef - a reference to the dom element
 * @returns HTMLElement
 */
export const getDomFromReference = (domRef: Document | _HTMLElement_ | string): _HTMLElement_ => {
  let out: _HTMLElement_;
  let outId;
  if (typeof domRef === 'string') {
    outId = `#${domRef}`;
    out = document.querySelector(outId) as _HTMLElement_;
  } else if (domRef instanceof Element) {
    out = domRef;
    outId = domRef.id;
  } else {
    errorLog('Dom reference is neither a dom string id nor an instance of an element');
    out = createElement('p', 'err404') as _HTMLElement_;
  }
  return out;
};

/**
 *
 * @param {DOM Element | String} domRef - reference to the dom element
 * @returns string id of the dom element
 */
export const getId = (domRef: _HTMLElement_): string => {
  const dom = getDomFromReference(domRef);
  if (dom === null || dom === undefined) {
    errorLog('DOM is eather null or undefined');
    return '';
  }
  return dom.id;
};
