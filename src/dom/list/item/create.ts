import { IApi } from '../../../types';
import { createHTMLButton } from '../../buttons';
import { createElement } from '../../create';

/**
 *
 * @param {string} id
 * @param {Image} colorImg
 * @returns HTML div
 */
export const createListItemColorImage = (
  id: string,
  colorImg: string
): HTMLImageElement => {
  const cd = createElement('img', `${id}-color-image`);
  cd.src = colorImg;

  return cd;
};

/**
 *
 * @param {String} id
 * @returns HTML paragraph
 */
export const createListItemColorText = (id: string): HTMLParagraphElement => {
  const ct = createElement('p', `${id}-paragraph`);
  return ct;
};

/**
 *
 * @param {String} id
 * @param {String} type
 * @returns HTML list item
 */
export const createListItemHead = (id: string): HTMLLIElement => {
  const listItem = createElement('li', `list-item-${id}`);
  listItem.classList.add('list-item');
  return listItem;
};

/**
 *
 * @param {String} id
 * @returns HTML button
 * @deprecated
 */
export const createListButton = (id: string, api: IApi): HTMLButtonElement => {
  const listButton = createHTMLButton(`list-button-${id}`, '', api);
  listButton.classList.add('list-button');
  return listButton;
};

/**
 *
 * @param {String} id
 * @param {String} type
 * @param {String} img
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {Function} itemFunction
 * @returns fully composed list item
 */
export const createListItem = (
  id: string,
  imageReference: string,
  itemFunction: () => void,
  api: IApi
): HTMLLIElement => {
  const listHead = createListItemHead(id);

  listHead.onmousedown = (event) => event.preventDefault();

  const listButton = createHTMLButton(`list-button-${id}`, imageReference, api);
  listButton.classList.add('list-button');

  listHead.appendChild(listButton);

  listHead.addEventListener('click', itemFunction);

  return listHead;
};
