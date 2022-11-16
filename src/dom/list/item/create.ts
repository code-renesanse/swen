import { getImage } from '../../../dictionary';
import { IApi } from '../../../types';
import { createElement } from '../../create';
import { _HTMLElement_ } from '../../dom.model';
import { appendElementList } from '../../subelements';

/**
 *
 * @param {string} id
 * @param {Image} colorImg
 * @returns HTML div
 */
export const createListItemColorImage = (id: string, colorImg: string): _HTMLElement_ => {
  const cd = createElement('img', `${id}-color-img`) as _HTMLElement_;

  cd.addClass(
    'background-size-100',
    'w-4r',
    'h-4r',
    'border-2',
    'border-dark'
  );

  cd.src = colorImg;

  return cd;
};

/**
 *
 * @param {String} id
 * @returns HTML paragraph
 */
export const createListItemColorText = (id: string): _HTMLElement_ => {
  const ct = createElement('p', `${id}-paragraph`) as _HTMLElement_;

  ct.addClass(
    'm-0',
    'text-capitalize'
  );

  return ct;
};

/**
 *
 * @param {String} id
 * @param {String} type
 * @returns HTML list item
 */
export const createListItemHead = (id: string, type: string): _HTMLElement_ => {
  const lh = createElement('li', `${id}`) as _HTMLElement_;
  lh.className = `color-item ${type}`;

  lh.addClass(
    'd-flex',
    'flex-column',
    'w-7r'
  );

  return lh;
};

/**
 *
 * @param {String} id
 * @returns HTML button
 */
export const createListElement = (id: string): HTMLButtonElement => {
  const _listElement = createElement('button', `${id}-button`);
  _listElement.addClass('list-element');
  // o.addClass(
  //   'list-element',
  //   'd-flex',
  //   'flex-column',
  //   'justify-content-center',
  //   'align-items-center',
  //   'bg-transparent',
  //   'border-none',
  //   'on-hover'
  // );
  return _listElement;
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

  const listElement = createListElement(id) as _HTMLElement_;

  const colorImageLink = getImage(img, api);
  //   colorImageLink === -1 || colorImageLink === -2 ? colorImageLink = 'https://via.placeholder.com/256x256.png' : '';

  const colorImg = createListItemColorImage(id, colorImageLink);

  const colorTxt = createListItemColorText(id);

  appendElementList(listElement, colorImg, colorTxt);
  appendElementList(listHead, listElement);
  listHead.addEventListener('click', itemFunction);

  return listHead;
};
