import { developmentLog } from '../logger';
import { IApi, ICacheInstance, ITranslation } from '../types';

export const loadNewTransllationFiles = async (langAssets: ICacheInstance, api: IApi): Promise<boolean> => {
  if (api.languages === null || api.languages === undefined) {
    api.languages = {};
  }

  const keys: string[] = Object.keys(langAssets);
  for (const key of keys) {
    const translation: ITranslation = langAssets[key] as ITranslation;
    const lang: string = translation.lang;
    api.languages[lang] = translation;
    developmentLog(`Loaded '${key}' translation file`);
  }

  return true;
};

export const Translator = (api: IApi, lang: string): ITranslation => {
  developmentLog(`Translator set to '${lang}' language`);
  document.getElementsByTagName('html')[0].lang = lang;

  return api.languages[lang];
};
