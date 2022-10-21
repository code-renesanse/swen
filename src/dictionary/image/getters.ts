
/**
 *
 * @param {SWEN API object} api - JSON object holding all application data
 * @param {string} imageKey - string reference to the image inside the dictioanry
 * @returns image date form stored in the image dictionary
 */

import { errorLog } from '../../logger';
import { API } from '../../types';

// TODO: rename function to something like _getImage
export function getImage (imageKey: string, api: API): string {
  const result: string = api.image_dictionary[imageKey];
  if (result === null || result === undefined || result === '') {
    errorLog(`Image with key '${imageKey} does not exist in the image dictionary'`);
    return 'https://via.placeholder.com/256x256.png';
  }
  return result;
}
