import { errorLog } from '../logger';
import { addClass, replaceClass, removeClass } from './class';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DomElement | String} domRef
 * @returns
 */
export const showSelection = (domRef: HTMLElement | string | HTMLElement[] | string[]): void => {
  if (domRef instanceof Array) {
    domRef.forEach((e: string | HTMLElement) => {
      showSelection(e);
    });
  } else {
    const dom = getDomFromReference(domRef);
    addClass(dom, 'bold');
    for (let i = 0; i < dom.children.length; i++) {
      const domChild = dom.children[i] as HTMLElement;
      replaceClass(domChild, 'on-hover', 'on-hover-dis');
    }
  }
};

/**
 *
 * @param {DOM Element | String | Array} domRef
 * @returns
 */
export const clearSelection = (domRef: HTMLElement | HTMLElement[] | string | string[]): void => {
  if (domRef instanceof Array) {
    domRef.forEach((e: string | HTMLElement) => {
      clearSelection(e);
    });
  } else {
    const fItem = getDomFromReference(domRef);
    if (fItem.classList.contains('bold')) {
      removeClass(fItem, 'bold');
    }
    const fParent = fItem.parentElement;
    if (fParent === null) {
      errorLog(`${fItem.id} parent element is null`);
      return;
    }
    removeClass(fParent, 'bold');
    for (let i = 0; i < fItem.children.length; i++) {
      const domChild = fItem.children[i] as HTMLElement;
      replaceClass(domChild, 'on-hover-dis', 'on-hover');
    }
  }
};
