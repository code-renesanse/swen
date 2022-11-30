import { getImage } from '../../dictionary';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import { setAnimation, setAnimationIterationCount } from '../animations/setters';
import { createElement } from '../create';

/**
  * Creates an div element that has all of the loading stuffs
  * @returns DOM elment
  */
export const createLoadingbarContent = (imageKey: string, api: IApi): HTMLDivElement => {
  const _wrapper = createElement('div', 'loading-bar');
  const _loadingImg = createLoadingbarImage(imageKey, api);
  const _progressBar = createLoadingbarProgress();

  _wrapper.appendChild(_loadingImg);
  _wrapper.appendChild(_progressBar);
  return _wrapper;
};

export const createLoadingbarProgress = (): HTMLDivElement => {
  const _holder = createElement('div', 'loading-bar-holder');
  const _progess = createElement('div', 'loading-bar-progress');
  _holder.appendChild(_progess);
  return _holder;
};

/**
* !DEPRICATED!
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
export const createLoadingSvgHolder = (): HTMLDivElement => {
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
  * @param {String} imageKey
  * @returns img dom element
  */
export const createLoadingbarImage = (imageKey: string, api: IApi): HTMLImageElement => {
  const loadingbarImage = createElement('img', 'loading-bar-image');
  const imageRef = getImage(imageKey, api);
  loadingbarImage.src = imageRef;
  loadingbarImage.alt = 'logo-revel-gif';

  setAnimation(loadingbarImage, 'popOut', '2s', 'ease-in-out');
  setAnimationIterationCount(loadingbarImage, 'infinite');

  return loadingbarImage;
};

/**
 * Creates a loading gif DOM element and puts it on the page
 * @returns resolved promise
 */
export const createLoadingbar = async (api: IApi): Promise<boolean> => await new Promise((resolve) => {
  const APP = document.querySelector('#app') ?? createElement('div', 'error404');
  const PATH = process.env.LOADING_GIF_PATH ?? '';

  if (APP.id === 'error404') {
    errorLog('No valid APP div holder');
  }
  if (PATH === '') {
    errorLog('No valid LOADING_GIF_PATH');
  }

  const loadingbar = createLoadingbarContent(PATH, api);
  loadingbar.style.opacity = '0';
  // const loadGif = createLoadingbarGifImg(PATH, api) as unknown as _HTMLElement_;
  // const loadSpan = createLoadingbarSpan();

  APP.appendChild(loadingbar);

  resolve(true);
});
