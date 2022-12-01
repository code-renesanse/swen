import { getImage } from '../../dictionary';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import { setAnimation, setAnimationIterationCount } from '../animations/setters';
import { createElement } from '../create';

/**
 * Creates the loading bar holder and progress bar
 * @returns DIV Element - loading-bar-holder
 */
export const createLoadingbarProgress = (): HTMLDivElement => {
  const _holder = createElement('div', 'loading-bar-holder');
  const _progess = createElement('div', 'loading-bar-progress');
  _holder.appendChild(_progess);
  return _holder;
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

  APP.appendChild(loadingbar);

  resolve(true);
});

export const hideLoadingBar = async (): Promise<void> => {
  return await new Promise((resolve, reject) => {
    const API_FRAME = document.querySelector<HTMLElement>('#api-frame');
    const loadingbar = document.querySelector<HTMLElement>('#loading-bar');

    if (API_FRAME === null) {
      return reject(errorLog('api-frame does not exist!'));
    }

    if (loadingbar === null) {
      return reject(errorLog('loading-bar does not exist!'));
    };

    const loadingbarprogress = loadingbar.querySelector<HTMLElement>('#loading-bar-progress');

    if (loadingbarprogress === null) {
      return reject(errorLog('loading-bar-progress does not exist'));
    }

    loadingbarprogress.addEventListener('animationend', () => {
      loadingbar.remove();
      API_FRAME.style.opacity = '1';
      return resolve();
    });
  });
};