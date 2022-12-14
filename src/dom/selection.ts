import { getDomFromReference } from './getters';

/**
 *
 * @param {DomElement | String} domRef
 * @returns
 */
export const showSelection = (element: HTMLElement | string, type: string, _canBeUnselected: boolean = false): void => {
  const _dom = getDomFromReference(element);
  if (_canBeUnselected) {
    if (_dom.classList.contains('selected-item')) {
      _dom.classList.remove('selected-item');
    } else {
      clearSelection(type);
      _dom.classList.add('selected-item');
    }
  } else {
    clearSelection(type);
    _dom.classList.add('selected-item');
  }
};

/**
 *
 * @param {DOM Element | String | Array} domRef
 * @returns
 */
export const clearSelection = (type: string): void => {
  const _testElms = document.querySelectorAll(`[${type}].selected-item`);
  if (_testElms !== undefined) {
    for (let i = 0; i < _testElms.length; i++) {
      _testElms[i].classList.remove('selected-item');
    }
  }
  // if (domRef instanceof Array) {
  //   domRef.forEach((e: string | _HTMLElement_) => {
  //     clearSelection(e);
  //   });
  // } else {

  // const fItem = getDomFromReference(domRef);
  // if (fItem.classList.contains('bold')) {
  //   fItem.removeClass('bold');
  // }
  // const fParent = fItem.parentElement as _HTMLElement_;
  // if (fParent === null) {
  //   errorLog(`${fItem.id} parent element is null`);
  //   return;
  // }
  // fParent.removeClass('bold');
  // for (let i = 0; i < fItem.children.length; i++) {
  //   const domChild = fItem.children[i] as _HTMLElement_;
  //   domChild.replaceClass('on-hover-dis', 'on-hover');
  // }
  // }
};
