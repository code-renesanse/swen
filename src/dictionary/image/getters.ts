
/**
 *
 * @param {SWEN API object} api - JSON object holding all application data
 * @param {string} imageKey - string reference to the image inside the dictioanry
 * @returns image date form stored in the image dictionary
 */

import { developmentLog } from '../../logger';
import { IApi } from '../../types';

// TODO: rename function to something like _getImage
export function getImage (imageKey: string, api: IApi): string {
  if (imageKey === null || imageKey === undefined || imageKey === '') {
    developmentLog('Image with key is not available');
    return 'https://via.placeholder.com/256x256.png';
  }

  if (imageKey.startsWith('https://')) {
    return imageKey;
  }

  const result: string = api.image_dictionary[imageKey];
  if (result === null || result === undefined || result === '') {
    developmentLog(`Image with key '${imageKey}' does not exist in the image dictionary`);
    return 'https://via.placeholder.com/256x256.png';
  }
  return result;
}
