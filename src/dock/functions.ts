// TODO: remove replace calls

import { createElement, getDomFromReference } from '../dom';
import { getTranslation } from '../languages';
import { IApi } from '../types';
/**
 * Creates an dock item div element
 * @returns HTML div element
 */
export const createDockItem = (): HTMLDivElement => {
  const _dockItem = createElement('div', `dock-item-${document.getElementsByClassName('dock-item').length}`);
  _dockItem.classList.add('dock-item');
  return _dockItem;
};

/**
 *
 * @param {DOMElement} btnHolder
 * @returns HTML div element
 */
export const createDockItemContent = (btnHolder: HTMLElement): HTMLDivElement => {
  const dic = createElement('div', `dock-item-${document.getElementsByClassName('dock-item-content').length}-content`);
  dic.classList.add('dock-item-content');
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
export const createDockTitleButton = (api: IApi, id: string): HTMLButtonElement => {
  const _dockTitleButton = createElement('button', id);
  _dockTitleButton.classList.add('dock-item-title');
  _dockTitleButton.disabled = true;
  _dockTitleButton.textContent = getTranslation(api, id);
  return _dockTitleButton;
};

/**
*
* @returns dock-wripper with no elements inside
*/
export const clearDockWrapper = (): HTMLElement => {
  const wrapper = getDomFromReference('dock-wrapper');

  for (let i = wrapper.childElementCount - 1; i >= 0; i--) {
    wrapper.children[i].remove();
  }

  return wrapper;
};
