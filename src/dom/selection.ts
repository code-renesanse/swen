import { _HTMLElement_ } from './dom.model';
import { getDomFromReference } from './getters';

/**
 *
 * @param {DomElement | String} domRef
 * @returns
 */
export const showSelection = (_element: _HTMLElement_ | string | _HTMLElement_[] | string[], _type: string, _canBeUnselected: boolean): void => {
  if (_element instanceof Array) {
    _element.forEach((e: string | _HTMLElement_) => {
      showSelection(e, _type, _canBeUnselected);
    });
  } else {
    const _dom = getDomFromReference(_element);
    if (_canBeUnselected) {
      if (_dom.classList.contains('selected-item')) {
        _dom.classList.remove('selected-item');
      } else {
        clearSelection(_type);
        _dom.addClass('selected-item');
      }
    } else {
      clearSelection(_type);
      _dom.addClass('selected-item');
    }
  }
};

/**
 *
 * @param {DOM Element | String | Array} domRef
 * @returns
 */
export const clearSelection = (_type: string): void => {
  const _testElms = document.querySelectorAll(`[${_type}].selected-item`);
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
