import { getImage } from '../../../dictionary';
import { IApi } from '../../../types';
import { addClass } from '../../class';
import { createElement } from '../../create';
import { appendElementList } from '../../subelements';

/**
 *
 * @param {string} id
 * @param {Image} colorImg
 * @returns HTML div
 */
export const createListItemColorImage = (id: string, colorImg: string): HTMLImageElement => {
  const cd = createElement('img', `${id}-color-img`);

  addClass(cd, [
    'background-size-100',
    'w-4r',
    'h-4r',
    'border-2',
    'border-dark'
  ]);

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

  addClass(ct, [
    'm-0',
    'text-capitalize'
  ]);

  return ct;
};

/**
 *
 * @param {String} id
 * @param {String} type
 * @returns HTML list item
 */
export const createListItemHead = (id: string, type: string): HTMLLIElement => {
  const lh = createElement('li', `${id}`);
  lh.className = `color-item ${type}`;

  addClass(lh, [
    'd-flex',
    'flex-column',
    'w-7r'
  ]);

  return lh;
};

/**
 *
 * @param {String} id
 * @returns HTML button
 */
export const createListElement = (id: string): HTMLButtonElement => {
  const o = createElement('button', `${id}-button`);
  addClass(o, 'list-element');
  addClass(o, 'd-flex');
  addClass(o, 'flex-column');
  addClass(o, 'justify-content-center');
  addClass(o, 'align-items-center');
  addClass(o, 'bg-transparent');
  addClass(o, 'border-none');
  addClass(o, 'on-hover');
  return o;
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
export const createListItem = (id: string, type: string = '', img: string = '', itemFunction: () => void, api: IApi): HTMLLIElement => {
  const listHead = createListItemHead(id, type);

  listHead.onmousedown = (event) => event.preventDefault();

  const listElement = createListElement(id);

  const colorImageLink = getImage(img, api);
  //   colorImageLink === -1 || colorImageLink === -2 ? colorImageLink = 'https://via.placeholder.com/256x256.png' : '';

  const colorImg = createListItemColorImage(id, colorImageLink);

  const colorTxt = createListItemColorText(id);

  appendElementList(listElement, colorImg, colorTxt);
  appendElementList(listHead, listElement);
  listHead.addEventListener('click', itemFunction);

  return listHead;
};
