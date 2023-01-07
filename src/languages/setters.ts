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
  api.translator = Translator(api, lang);

  if (api.translator === null || api.translator === undefined) {
    errorLog(`${lang} is not a valid language`);
    return '';
  }

  document.title = getTranslation(api, 'title');

  const returnToSelectionButton = document.querySelector(
    '#return-to-selection-button'
  );

  if (returnToSelectionButton !== null) {
    const translationString = getTranslation(api, 'return-to-selection-button');
    returnToSelectionButton.textContent = translationString;
  }

  Object.keys(api.component_load_map).forEach((key) => {
    const component = api.component_load_map[key];
    component.languageUpdate(api);
  });

  return lang;
};
