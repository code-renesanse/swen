import { getDomFromReference } from '../../dom';
import { IApi } from '../../types';
import { getLangFromURL, getTranslation } from '../getters';
import { Translator } from '../translator';

/**
 * Creates the loading ... animation
 * @param {Sketchfab API object} api - JSON object holding all application data
 */

export const wordsSpin = async (api: IApi): Promise<void> => {
  if (api.translator === null || api.translator === undefined) {
    const lang = getLangFromURL();
    api.translator = Translator(api, lang);
  }

  let i = 1;
  const words = getTranslation(api, 'loadingtext');
  const loadingSpan = getDomFromReference('loading-bar-span');
  loadingSpan.addClass('text-capitalize');
  loadingSpan.textContent = words[0].toLowerCase();
  loadingSpan.addClass('popInOutElement');

  loadingSpan.addEventListener('animationend', () => {
    if (i > words.length - 1) {
      i = 0;
    }
    loadingSpan.textContent = words[i].toLowerCase();
    i++;

    loadingSpan.style.animation = 'none';
    // loadingSpan.offsetHeight;
    // TODO: check if this works
    loadingSpan.style.animation = '';
  });
};
