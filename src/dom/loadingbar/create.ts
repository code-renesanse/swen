import { getImage } from '../../dictionary';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import { setAnimation, setAnimationIterationCount } from '../animations/setters';
import { createElement } from '../create';
import { _HTMLElement_ } from '../dom.model';

/**
  * DIV holder for the loading gif
  * @returns DOM elment
  */
export const createLoadingbar = (): HTMLDivElement => {
  const gifDiv = createElement('div', 'loading-bar');
  gifDiv.addClass(
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center',
    'position-absolute'
  );
  return gifDiv;
};

/**
*
* @returns span dom element
*/
export const createLoadingbarSpan = (): HTMLSpanElement => {
  const lodingGifSpan = createElement('span', 'loading-bar-span');
  lodingGifSpan.addClass('loading-span');
  return lodingGifSpan;
};

/**
 *
 * @returns HTML div element
 */
// TODO: create a unique loding bar function
export const createLoadingbarSvgHolder = (): HTMLDivElement => {
  const svgDom = createElement('div', 'loading-bar');
  svgDom.addClass(
    'position-absolute',
    'w-4r',
    'h-auto',
    'top-0',
    'start-50',
    'translate-middle-x',
    'bg-transparent-white'
  );
  return svgDom;
};

/**
  *
  * @param {String} gif
  * @returns img dom element
  */
export const createLoadingbarGifImg = (gif: string, api: IApi): HTMLImageElement => {
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
export const createLoadingbarGif = async (api: IApi): Promise<boolean> => await new Promise((resolve) => {
  const APP = document.querySelector('#app') ?? createElement('div', 'error404');
  const PATH = process.env.LOADING_GIF_PATH ?? '';

  if (APP.id === 'error404') {
    errorLog('No valid APP div holder');
  }
  if (PATH === '') {
    errorLog('No valid LOADING_GIF_PATH');
  }

  const loadingBar = createLoadingbar();
  const loadGif = createLoadingbarGifImg(PATH, api) as unknown as _HTMLElement_;
  const loadSpan = createLoadingbarSpan();

  loadingBar.appendChild(loadGif);
  loadingBar.appendChild(document.createElement('br'));
  loadingBar.appendChild(loadSpan);

  setAnimation(loadGif, 'popOut', '2000ms', 'ease-in-out');
  setAnimationIterationCount(loadGif, 'infinite');

  APP.appendChild(loadingBar);

  resolve(true);
});
