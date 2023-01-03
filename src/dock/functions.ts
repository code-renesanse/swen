// TODO: remove replace calls

import { createElement, createHTMLButton, getDomFromReference } from '../dom';
import { IApi } from '../types';
/**
 * Creates an dock item div element
 * @returns HTML div element
 */
export const createDockItem = (): HTMLDivElement => {
  const dockItem = createElement(
    'div',
    `dock-item-${document.getElementsByClassName('dock-item').length}`
  );
  dockItem.classList.add('dock-item');
  return dockItem;
};

/**
 *
 * @param {DOMElement} btnHolder
 * @returns HTML div element
 */
export const createDockItemContent = (
  btnHolder: HTMLElement
): HTMLDivElement => {
  const dic = createElement(
    'div',
    `dock-item-${
      document.getElementsByClassName('dock-item-content').length
    }-content`
  );
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
export const createDockTitleButton = (
  api: IApi,
  id: string
): HTMLButtonElement => {
  const dockTitleButton = createHTMLButton(id, '', api);
  dockTitleButton.classList.add('dock-item-title');
  dockTitleButton.disabled = true;
  return dockTitleButton;
};
