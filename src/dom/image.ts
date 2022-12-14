import { getImage } from '../dictionary';
import { IApi } from '../types';
import { createElement } from './create';

/**
 *
 * @param {String} modelId - model identificator
 * @param {String} alt - image alt
 * @returns img HTML element
 */
export const createImageHolder = (modelId: string, alt: string, api: IApi): HTMLImageElement => {
  const id = `card-image-${document.getElementsByTagName('img').length}`;
  const cardImg = createElement('img', id);
  const imgRef = getImage(modelId, api);

  cardImg.src = imgRef;
  cardImg.alt = alt;

  return cardImg;
};
