import { getImage } from '../dictionary';
import { API } from '../types';
import { addClass } from './class';
import { createElement } from './create';

/**
 *
 * @param {String} modelId - model identificator
 * @param {String} alt - image alt
 * @returns img HTML element
 */
export const createImageHolder = (modelId: string, alt: string, api: API): HTMLImageElement => {
  const id = `card-img-${document.getElementsByTagName('img').length}`;
  const cardImg = createElement('img', id);
  let imgRef = getImage(modelId, api);

  // TODO: put this into the swen-dictionary getImage function
  if (imgRef === '') {
    imgRef = 'https://via.placeholder.com/512x256.png';
  }

  cardImg.src = imgRef;
  cardImg.alt = alt;
  addClass(cardImg, [
    'w-100',
    'h-100'
  ]);

  return cardImg;
};
