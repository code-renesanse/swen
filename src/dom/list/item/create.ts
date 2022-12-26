import { getImage } from '../../../dictionary';
import { IApi } from '../../../types';
import { createHTMLButton } from '../../buttons';
import { createElement } from '../../create';
import { appendElementList } from '../../subelements';

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
  img: string,
  itemFunction: () => void,
  api: IApi
): HTMLLIElement => {
  const listHead = createListItemHead(id);

  listHead.onmousedown = (event) => event.preventDefault();

  const listElement = createListButton(id, api);

  const colorImageLink = getImage(img, api);

  const colorImg = createListItemColorImage(id, colorImageLink);

  const colorTxt = createListItemColorText(id);

  appendElementList(listElement, colorImg, colorTxt);
  appendElementList(listHead, listElement);

  listHead.addEventListener('click', itemFunction);

  return listHead;
};
