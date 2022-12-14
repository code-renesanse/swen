import { addClass, createElement, removeClass, replaceClass } from '../dom';
import { getTranslation } from '../languages';
import { IApi } from '../types';
import { getIdFromDockItem } from './getters';

/**
 *
 * @returns HTML div element
 */
export const createDockElement = (): HTMLDivElement => {
  const e = createElement('div', `dock-item-${document.getElementsByClassName('delm').length}`);
  addClass(e, [
    'delm',
    'p-1'
  ]);
  return e;
};

/**
 *
 * @param {DOMElement} btnHolder
 * @returns HTML div element
 */
export const createDockItemContent = (btnHolder: HTMLElement): HTMLDivElement => {
  const dic = createElement('div', 'dock-item-content');
  dic.className = 'dock-item-content';
  addClass(dic, 'd-none');
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
export const createDockTitleButton = (api: IApi, id: string, dockElement: HTMLElement): HTMLButtonElement => {
  const b = createElement('button', id);

  addClass(b, [
    'd-block',
    'bg-transparent',
    'border-none',
    'text-capitalize',
    'p-1',
    'h-2',
    'button-hover',
    'overflow-hidden',
    'white-space-nowrap',
    'text-ellipsis'
  ]);

  b.disabled = true;
  b.textContent = getTranslation(api, id);
  b.addEventListener('click', () => {
    addClass(b, 'button-selected');
    const dockContent = dockElement.children[1];
    dockContent.classList.contains('d-none')
      ? replaceClass(dockContent as HTMLElement, 'd-none', 'd-flex')
      : replaceClass(dockContent as HTMLElement, 'd-flex', 'd-none');

    if (dockContent.classList.contains('d-none')) {
      removeClass(b, 'button-selected');
    }

    const all = document.getElementsByClassName('delm');
    for (let i = 0; i < all.length; i++) {
      const index: number = getIdFromDockItem(all[i] as HTMLElement);
      const dockElementIndex: number = getIdFromDockItem(dockElement);
      if (index !== dockElementIndex) {
        all[index].children[1].classList.replace('d-flex', 'd-none');
        removeClass(all[index].children[0] as HTMLElement, 'button-selected');
      }
    }
  });

  return b;
};

/**
*
* @returns dock-wripper with no elements inside
*/
export const clearDockWrapper = (): HTMLDivElement | null => {
  const wrapper = document.querySelector('#dock-wrapper') as HTMLDivElement;

  if (wrapper !== null) {
    for (let i = wrapper.childElementCount - 1; i >= 0; i--) {
      wrapper.children[i].remove();
    }
    return wrapper;
  }
  return null;
};
