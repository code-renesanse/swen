import { getDomFromReference } from '../dom';
import { errorLog } from '../logger';
import { IApi } from '../types';
import { getTranslation } from './getters';
import { Translator } from './translator';

/**
 * This method is called when clicking on an language button and will load JSON data with new translations
 * It will also update all page components to the new language
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {String} lang - the lang that the app will switch to
 */
export const setLang = async (api: IApi, lang: string): Promise<string> => {
  api.translator = await Translator(api, lang);

  if (api.translator === null || api.translator === undefined) {
    errorLog(`${lang} is not a valid language`);
    return '';
  }

  const apiUpdate = api.configuration_components[0].api;
  if (apiUpdate === null) {
    console.error('API not loaded');
    return '';
  }

  document.title = getTranslation(api, 'title');

  const rtsBtn = getDomFromReference('return-to-selection-button');
  rtsBtn.textContent = getTranslation(api, 'return-to-selection-button');

  api.configuration_components.forEach(cmp => {
    cmp.updateLang(api);
  });

  return lang;
};
