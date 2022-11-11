import { createElement, getDomFromReference, _HTMLElement_, _HTMLObjectElement_ } from '../dom';
import { getTranslation } from '../languages';
import { IApi } from '../types';
import { getIdFromDockItem } from './getters';

/**
 * Creates an dock item div element
 * @returns HTML div element
 */
export const createDockItem = (): _HTMLElement_ => {
  const _dockItem = createElement('div', `dock-item-${document.getElementsByClassName('delm').length}`);
  _dockItem.addClass('dock-item');
  return _dockItem;
};

/**
 *
 * @param {DOMElement} btnHolder
 * @returns HTML div element
 */
export const createDockItemContent = (btnHolder: _HTMLElement_): _HTMLElement_ => {
  const dic = createElement('div', 'dock-item-content');
  dic.appendChild(btnHolder);
  return dic;
};

/**
*
* @param {String} id - title button id
* @param {DOMELement} dockElement
* @param {Sketchfab API object} api - JSON object holding all application data
* @returns HTML buutton element
*/
export const createDockTitleButton = (api: IApi, id: string, dockElement: _HTMLElement_): _HTMLElement_ => {
  const _dockTitleButton = createElement('button', id);

  // _dockTitleButton.addClass(
  //   'd-block',
  //   'bg-transparent',
  //   'border-none',
  //   'text-capitalize',
  //   'p-1',
  //   'h-2',
  //   'button-hover',
  //   'overflow-hidden',
  //   'white-space-nowrap',
  //   'text-ellipsis');

  _dockTitleButton.disabled = true;
  _dockTitleButton.textContent = getTranslation(api, id);
  _dockTitleButton.addEventListener('click', () => {
    _dockTitleButton.addClass('button-selected');
    const dockContent = dockElement.children[1] as _HTMLObjectElement_<'div'>;
    const _computedStyle = window.getComputedStyle(dockContent).display;
    if (_computedStyle === 'none') {
      // dockContent.replaceClass('d-none', 'd-flex');
      dockContent.style.display = 'flex';

      _dockTitleButton.removeClass('button-selected');
    } else if (_computedStyle === 'flex') {
      // dockContent.replaceClass('d-flex', 'd-none');
      dockContent.style.display = 'none';
    }

    const all = document.getElementsByClassName('delm');
    for (let i = 0; i < all.length; i++) {
      const index: number = getIdFromDockItem(all[i] as HTMLElement);
      const dockElementIndex: number = getIdFromDockItem(dockElement);
      if (index !== dockElementIndex) {
        // all[index].children[1].classList.replace('d-flex', 'd-none');
        const _tmp = all[index].children[1] as _HTMLElement_;
        const _elm = all[index].children[0] as _HTMLObjectElement_<'button'>;
        _tmp.style.display = 'none';
        _elm.removeClass('button-selected');
      }
    }
  });

  return _dockTitleButton;
};

/**
*
* @returns dock-wripper with no elements inside
*/
export const clearDockWrapper = (): _HTMLElement_ | null => {
  const wrapper = getDomFromReference('dock-wrapper');

  if (wrapper !== null) {
    for (let i = wrapper.childElementCount - 1; i >= 0; i--) {
      wrapper.children[i].remove();
    }
    return wrapper;
  }
  return null;
};
