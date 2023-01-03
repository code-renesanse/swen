import { getImage } from '../../dictionary';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import {
  setAnimation,
  setAnimationIterationCount,
} from '../animations/setters';
import { createElement } from '../create';

const svgAsset = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <rect x="17.5" y="30" width="15" height="40" fill="#666666">
    <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
    <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
  </rect>
  <rect x="42.5" y="30" width="15" height="40" fill="#353535">
      <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
      <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
  </rect>
      <rect x="67.5" y="30" width="15" height="40" fill="#666666">
      <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
      <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
  </rect>
</svg>`;

export const showLoading = (loadingPath?: string) => {
  const holder = createElement('div', 'loading-bar-holder');

  const loadingbar = createElement('img', 'loading-bar-image');
  if (loadingPath !== undefined) {
    loadingbar.src = loadingPath;
  } else {
    loadingbar.innerHTML = svgAsset;
  }

  holder.appendChild(loadingbar);
  return holder;
};

export const hideLoading = () => {
  const holder = document.querySelector('#loading-bar-holder');
  holder?.remove();
};

/**
 * Creates the loading bar holder and progress bar
 * @returns DIV Element - loading-bar-holder
 */
export const createLoadingbarProgress = (): HTMLDivElement => {
  const holder = createElement('div', 'loading-bar-holder');
  const progess = createElement('div', 'loading-bar-progress');
  holder.appendChild(progess);
  return holder;
};

/**
 *
 * @param {String} imageKey
 * @returns img dom element
 */
export const createLoadingbarImage = (
  imageKey: string,
  api: IApi
): HTMLImageElement => {
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
export const createLoadingbarContent = (
  imageKey: string,
  api: IApi
): HTMLDivElement => {
  const wrapper = createElement('div', 'loading-bar');
  const loadingImg = createLoadingbarImage(imageKey, api);
  const progressBar = createLoadingbarProgress();

  wrapper.appendChild(loadingImg);
  wrapper.appendChild(progressBar);
  return wrapper;
};

/**
 * Creates a loading gif DOM element and puts it on the page
 * @returns resolved promise
 */
export const createLoadingbar = async (api: IApi): Promise<boolean> =>
  new Promise((resolve) => {
    const APP =
      document.querySelector('#app') ?? createElement('div', 'error404');
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
  return new Promise((resolve, reject) => {
    const API_FRAME = document.querySelector<HTMLElement>('#api-frame');
    const loadingbar = document.querySelector<HTMLElement>('#loading-bar');

    if (API_FRAME === null) {
      return reject(errorLog('api-frame does not exist!'));
    }

    if (loadingbar === null) {
      return reject(errorLog('loading-bar does not exist!'));
    }

    const loadingbarprogress = loadingbar.querySelector<HTMLElement>(
      '#loading-bar-progress'
    );

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
