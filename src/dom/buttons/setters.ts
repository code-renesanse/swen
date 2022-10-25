import { getImage } from '../../dictionary';
import { IApi } from '../../types';
import { getDomFromReference } from '../getters';

/**
 *
 * @param {string} buttonId - id of the button dom element
 * @param {string} imgRef - reference to the image in the image dictionary
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export const setImageOfHTMLButton = (buttonId: string | HTMLImageElement, imgRef: string, api: IApi): void => {
  const btn = getDomFromReference(buttonId) as HTMLImageElement;
  btn.src = getImage(imgRef, api);
};
