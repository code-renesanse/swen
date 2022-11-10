import { errorLog } from '../logger';
import { _HTMLElement_ } from './dom.model';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DomElement | String} domRef
 * @returns
 */
export const showSelection = (domRef: _HTMLElement_ | string | _HTMLElement_[] | string[]): void => {
  if (domRef instanceof Array) {
    domRef.forEach((e: string | _HTMLElement_) => {
      showSelection(e);
    });
  } else {
    const dom = getDomFromReference(domRef);
    dom.addClass('bold');
    for (let i = 0; i < dom.children.length; i++) {
      const domChild = dom.children[i] as _HTMLElement_;
      domChild.replaceClass('on-hover', 'on-hover-dis');
    }
  }
};

/**
 *
 * @param {DOM Element | String | Array} domRef
 * @returns
 */
export const clearSelection = (domRef: _HTMLElement_ | _HTMLElement_[] | string | string[]): void => {
  if (domRef instanceof Array) {
    domRef.forEach((e: string | _HTMLElement_) => {
      clearSelection(e);
    });
  } else {
    const fItem = getDomFromReference(domRef);
    if (fItem.classList.contains('bold')) {
      fItem.removeClass('bold');
    }
    const fParent = fItem.parentElement as _HTMLElement_;
    if (fParent === null) {
      errorLog(`${fItem.id} parent element is null`);
      return;
    }
    fParent.removeClass('bold');
    for (let i = 0; i < fItem.children.length; i++) {
      const domChild = fItem.children[i] as _HTMLElement_;
      domChild.replaceClass('on-hover-dis', 'on-hover');
    }
  }
};
