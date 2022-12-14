import { IApi } from '../types';

/**
 *
 * @returns string
 */
export const getLangFromURL = (): string => window.location.href.split('/')[window.location.href.split('/').length - 1] === '' ? 'en' : window.location.href.split('/')[window.location.href.split('/').length - 1];

/**
  *
  * @param {Sketchfab API object} api - JSON object holding all application data
  * @param {String} key - key  of the element to be translated
  * @returns the translated lowercase string
  */
export const getTranslation = (api: IApi, key: string): string => {
  let result = api.translator[key];
  if (result === null || result === undefined || result === '') {
    console.error(`ERROR 404: translation for key: ${key} does not exist or is empty`);
    return '';
  }

  if (typeof result === 'string') {
    result = result.toLowerCase();
  }
  return result;
};
