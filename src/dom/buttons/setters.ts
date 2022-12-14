import { getImage } from '../../dictionary';
import { IApi } from '../../types';
import { getDomFromReference } from '../getters';

/**
 *
 * @param {string} buttonId - id of the button dom element
 * @param {string} imgRef - reference to the image in the image dictionary
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export const setImageOfHTMLImage = (buttonId: string | HTMLElement, imgRef: string, api: IApi): HTMLImageElement => {
  const imageElement = getDomFromReference(buttonId) as HTMLImageElement;
  imageElement.src = getImage(imgRef, api);
  return imageElement;
};
