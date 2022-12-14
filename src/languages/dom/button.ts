import { createElement, getDomFromReference } from '../../dom';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import { setLang } from '../setters';

/**
 * Creates an HTML button and appends it to the language-button-holder div element
 * Button has an image that is pulled from alfastreet page :O
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {String} lang - language abbreviation
 */
// TODO: change the image picture loading so that it is not pulled from alfastreet !!
export const createLanguageButton = (api: IApi, lang: string): void => {
  // if(!validateAPI(api)) return;

  const parent = getDomFromReference('language-button-holder');

  // TODO: fix this so that it does not access alafstreet CDN
  const imagePrefix = 'https://alfastreet-marine.com/wp-content/plugins/sitepress-multilingual-cms/res/flags';

  const titleMap: { [key: string]: string } = {
    en: 'English',
    de: 'German',
    fr: 'French',
    nl: 'Dutch',
    es: 'Spanish'
  };

  const className = 'language-button';
  const id = `language-${lang}`;

  const title = titleMap[lang];

  const button = createElement('button', id);
  button.classList.add(className);

  button.title = title;

  const buttonImage = createElement('img', `${id}-image`);
  buttonImage.alt = title;
  buttonImage.src = `${imagePrefix}/${lang}.png`;
  buttonImage.classList.add('wpml-ls-flag');

  const elan = id.split('-')[1];
  button.addEventListener('click', () => {
    (async () => {
      await setLang(api, elan);
    })().catch(err => {
      errorLog(err);
    });
  });

  button.appendChild(buttonImage);
  parent.appendChild(button);
};
