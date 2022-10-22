import { getImage } from '../../dictionary';
import { errorLog } from '../../logger';
import { API } from '../../types';
import { setAnimation, setAnimationIterationCount } from '../animations/setters';
import { addClass } from '../class';
import { createElement } from '../create';

/**
  * DIV holder for the loading gif
  * @returns DOM elment
  */
export const createLoadingbar = (): HTMLDivElement => {
  const gifDiv = createElement('div', 'loading-bar');
  addClass(gifDiv, [
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center',
    'position-absolute'
  ]);
  return gifDiv;
};

/**
*
* @returns span dom element
*/
export const createLoadingbarSpan = (): HTMLSpanElement => {
  const lodingGifSpan = createElement('span', 'loading-bar-span');
  addClass(lodingGifSpan, 'loading-span');
  return lodingGifSpan;
};

/**
 *
 * @returns HTML div element
 */
export const createLoadingbarSvgHolder = (): HTMLDivElement => {
  const svgDom = createElement('div', 'loading-bar-svg-holder');
  addClass(svgDom, [
    'position-absolute',
    'w-4r',
    'h-auto',
    'top-0',
    'start-50',
    'translate-middle-x',
    'bg-transparent-white'
  ]);
  return svgDom;
};

/**
  *
  * @param {String} gif
  * @returns img dom element
  */
export const createLoadingbarGifImg = (gif: string, api: API): HTMLImageElement => {
  const loadingGifImage = createElement('img', 'loading-bar-gif-img');
  const imageRef = getImage(gif, api);
  loadingGifImage.src = imageRef;
  loadingGifImage.alt = 'logo-revel-gif';
  return loadingGifImage;
};

/**
 * Creates a loading gif DOM element and puts it on the page
 * @returns resolved promise
 */
export const createLoadingbarGif = async (api: API): Promise<boolean> => await new Promise((resolve) => {
  const APP = document.querySelector('#app') ?? createElement('div', 'error404');
  const PATH = process.env.LOADING_GIF_PATH ?? '';

  if (APP.id === 'error404') {
    errorLog('No valid APP div holder');
  }
  if (PATH === '') {
    errorLog('No valid LOADING_GIF_PATH');
  }

  const loadingBar = createLoadingbar();
  const loadGif = createLoadingbarGifImg(PATH, api);
  const loadSpan = createLoadingbarSpan();

  loadingBar.appendChild(loadGif);
  loadingBar.appendChild(document.createElement('br'));
  loadingBar.appendChild(loadSpan);

  setAnimation(loadGif, 'popOut', '2000ms', 'ease-in-out');
  setAnimationIterationCount(loadGif, 'infinite');

  APP.appendChild(loadingBar);

  resolve(true);
});
