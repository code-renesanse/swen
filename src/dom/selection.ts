import { getDomFromReference } from './getters';

/**
 *
 * @param {DOM Element | String | Array} domRef
 * @returns
 */
export const clearSelection = (type: string): void => {
  const testElms = document.querySelectorAll(`[${type}].selected-item`);
  if (testElms !== undefined) {
    testElms.forEach((element) => {
      element.classList.remove('selected-item');
    });
  }
};

/**
 *
 * @param {DomElement | String} domRef
 * @returns
 */
export const showSelection = (
  element: HTMLElement | string,
  type: string,
  _canBeUnselected = false
): void => {
  const dom = getDomFromReference(element);
  if (_canBeUnselected) {
    if (dom.classList.contains('selected-item')) {
      dom.classList.remove('selected-item');
    } else {
      clearSelection(type);
      dom.classList.add('selected-item');
    }
  } else {
    clearSelection(type);
    dom.classList.add('selected-item');
  }
};
