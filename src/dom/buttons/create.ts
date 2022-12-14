import { getImage } from '../../dictionary';
import { getTranslation } from '../../languages';
import { IApi } from '../../types';
import { openConfiguratorMenu } from '../configurationMenu';
import { createElement } from '../create';

/**
 *
 * @param {String} textContent
 * @param {DOMElement} popupHolder
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns HTML button element
 */
export const createValidResponseButton = (textContent: string, popupHolder: HTMLDivElement, api: IApi): HTMLButtonElement => {
  const button = createElement('button', 'valid-response-button');
  button.textContent = textContent;

  button.addEventListener('click', () => {
    openConfiguratorMenu(api);
    popupHolder.remove();
  });
  return button;
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

  const out = createElement('button', id);

  const text = createElement('p', `${id}-paragraph`);
  text.textContent = getTranslation(api, id);

  const ico = createElement('img', `${id}-image`);

  if (img === null) {
    ico.src = 'https://via.placeholder.com/256x256.png';
  } else {
    ico.src = getImage(img, api);
  }

  out.appendChild(ico);

  out.onmousedown = (event) => event.preventDefault();
  out.appendChild(text);

  return out;
};
