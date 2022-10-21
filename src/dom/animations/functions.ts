import { getDomFromReference } from '../getters';

/**
 *
 * @param {DOMElement | String} domRef - reference to the dom element
 * @returns
 */
export const clearAnimation = (domRef: string | HTMLElement): boolean => {
  const dom = getDomFromReference(domRef);
  dom.style.animation = '';
  return true;
};

/**
 *
 * @param {DOMElment} API_FRAME
 */
export const hideLoadingGif = (API_FRAME: HTMLIFrameElement): void => {
  const wrapper = document.querySelector('#dock-wrapper') as HTMLDivElement;
  const loadingBar = document.querySelector('#loading-bar');

  if (loadingBar !== null && wrapper !== null) {
    loadingBar.remove();
    wrapper.style.display = '';
    API_FRAME.style.opacity = '1';
  }
};
