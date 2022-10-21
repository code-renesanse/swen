import { getImage } from '../dictionary';
import { errorLog } from '../logger';
import { API } from '../types';
import { setAnimation, setAnimationIterationCount } from './animations/setters';
import { addClass } from './class';

/**
 *
 * @param {String} type DOM type
 * @param {String} id DOM id
 * @returns newly created DOM element
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(type: K, id: string): HTMLElementTagNameMap[K] => {
  const e = document.createElement(type);
  e.id = id;
  return e;
};

/**
 * Creates a loading gif DOM element and puts it on the page
 * @returns resolved promise
 */
export const createLoadingGif = async (api: API): Promise<boolean> => await new Promise((resolve) => {
  const APP = document.querySelector('#app') ?? createElement('div', 'error404');
  const PATH = process.env.LOADING_GIF_PATH ?? '';
  if (APP.id === 'error404') {
    errorLog('No valid APP div holder');
  }
  if (PATH === '') {
    errorLog('No valid LOADING_GIF_PATH');
  }
  const loadingBar = createLoadingGifDiv();
  const loadGif = createLoadingGifImg(PATH, api);
  const loadSpan = createLoadingGifSpan();

  loadingBar.appendChild(loadGif);
  loadingBar.appendChild(document.createElement('br'));
  loadingBar.appendChild(loadSpan);

  setAnimation(loadGif, 'popOut', '2000ms', 'ease-in-out');
  setAnimationIterationCount(loadGif, 'infinite');

  APP.appendChild(loadingBar);

  resolve(true);
});

/**
* DIV holder for the loading gif
* @returns DOM elment
*/
const createLoadingGifDiv = (): HTMLDivElement => {
  const gifDiv = createElement('div', 'loading-bar');
  addClass(gifDiv, 'd-flex');
  addClass(gifDiv, 'flex-column');
  addClass(gifDiv, 'justify-content-center');
  addClass(gifDiv, 'align-items-center');
  addClass(gifDiv, 'position-absolute');
  return gifDiv;
};

/**
*
* @param {String} gif
* @returns img dom element
*/
const createLoadingGifImg = (gif: string, api: API): HTMLImageElement => {
  const loadingGifImage = createElement('img', 'loading-gif-img');
  const imageRef = getImage(gif, api);
  loadingGifImage.src = imageRef;
  loadingGifImage.alt = 'logo-revel-gif';
  return loadingGifImage;
};

/**
*
* @returns span dom element
*/
const createLoadingGifSpan = (): HTMLSpanElement => {
  const lodingGifSpan = createElement('span', 'loading-span');
  addClass(lodingGifSpan, 'loading-span');
  return lodingGifSpan;
};
