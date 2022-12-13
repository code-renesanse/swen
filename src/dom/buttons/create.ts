import { getImage } from '../../dictionary';
import { getTranslation } from '../../languages';
import { IApi } from '../../types';
import { openConfiguratorMenu } from '../configurationMenu';
import { createElement } from '../create';
import { _HTMLElement_ } from '../dom.model';

/**
 *
 * @param {String} textContent
 * @param {DOMElement} popupHolder
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns HTML button element
 */
export const createValidResponseButton = (textContent: string, popupHolder: HTMLDivElement, api: IApi): HTMLButtonElement => {
  const btn = createElement('button', 'valid-response-button');
  // btn.addClass(
  //   'bg-transparent',
  //   'border',
  //   'border-none',
  //   'on-hover',
  //   'text-uppercase',
  //   'button-hover',
  //   'my-1'
  // );
  btn.textContent = textContent;

  btn.addEventListener('click', () => {
    openConfiguratorMenu(api);
    popupHolder.remove();
  });
  return btn;
};

/**
 *
 * @param {String} id - button id
 * @param {String} img - image key
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns html button element
 */
export const createHTMLButton = (id: string, img: string, api: IApi): HTMLButtonElement => {
  id = id.toString();

  const out = createElement('button', id) as _HTMLElement_;

  // out.addClass(
  //   'p-1',
  //   'w-7r',
  //   'bg-transparent',
  //   'border-dark',
  //   'm-1',
  //   'on-hover'
  // );

  const text = createElement('p', `${id}-paragraph`);
  text.textContent = getTranslation(api, id);

  // text.addClass(
  //   'd-flex',
  //   'm-0',
  //   'justify-content-center',
  //   'text-capitalize',
  //   'align-items-center'
  // );

  out.removeClass('on-hover');

  const ico = createElement('img', `${id}-img`);

  if (img === null) {
    ico.src = 'https://via.placeholder.com/256x256.png';
  } else {
    ico.src = getImage(img, api);
  }

  // get img form img dictionary
  ico.style.backgroundSize = '100%';

  // width and height styling
  // ico.addClass(
  //   'w-4r',
  //   'min-width-4r',
  //   'h-4r',
  //   'border',
  //   'border-2',
  //   'border-dark',
  //   'mx-1'
  // );

  out.appendChild(ico);

  out.onmousedown = (event) => event.preventDefault();
  out.appendChild(text);

  // out.addEventListener('click', (event) => selectUnselectButtonFunction(out, event));

  return out;
};
