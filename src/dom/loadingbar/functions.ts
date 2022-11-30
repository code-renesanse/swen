import { developmentLog, errorLog } from '../../logger';
import { createLoadingSvgHolder } from './create';
import { getLoadingSVG } from './getters';

/**
 * Creates and show the loading animation
 */
export const showLoading = (): void => {
  const APP = document.querySelector('#app');
  const loadHolder = createLoadingSvgHolder();
  const loadSvg = getLoadingSVG();

  loadHolder.innerHTML += (loadSvg);

  if (APP === null) {
    errorLog('APP holder is null');
  }

  APP?.appendChild(loadHolder);
};

/**
 *
 * @param {DOMElment} API_FRAME
 */
export const hideLoading = (API_FRAME: HTMLIFrameElement): void => {
  const wrapper = document.querySelector('#dock-wrapper') as HTMLDivElement;
  const loadingBar = document.querySelector('#loading-bar');
  const _loadingprogress = loadingBar?.querySelector('#loading-bar-progress');

  if (_loadingprogress !== null) {
    _loadingprogress?.setAttribute('animation', 'end');

    _loadingprogress?.addEventListener('animationend', () => {
      loadingBar?.remove();
      if (wrapper !== null) {
        wrapper.style.display = '';
      } else {
        developmentLog('Dock wrapper is null');
      }
      API_FRAME.style.opacity = '1';
    });
  } else {
    if (loadingBar !== null) {
      loadingBar.remove();
    } else {
      developmentLog('Loading bar is null');
    }

    if (wrapper !== null) {
      wrapper.style.display = '';
    } else {
      developmentLog('Dock wrapper is null');
    }
  }
};
