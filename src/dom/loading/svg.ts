import { developmentLog, errorLog } from '../../logger';
import { createElement } from '../create';
import { getLoadingSVG } from './getters';

/**
 *
 * @returns DIV Element
 */
export const createLoadingSvgHolder = (): HTMLDivElement => {
  const svgDom = createElement('div', 'loading-bar-svg');
  return svgDom;
};

/**
 * Creates and show the loading svg animation
 */
export const showLoadingSvg = (): void => {
  const APP = document.querySelector<HTMLElement>('#app');
  const loadHolder = createLoadingSvgHolder();
  const loadSvg = getLoadingSVG();

  if (APP === null) {
    errorLog('APP holder is null');
    return;
  }

  loadHolder.innerHTML = (loadSvg);

  APP.appendChild(loadHolder);
};

/**
 * Removes the svg loading element
 */
export const hideLoadingSvg = (): void => {
  const wrapper = document.querySelector('#dock-wrapper') as HTMLDivElement;
  const loadingBarSvg = document.querySelector('#loading-bar-svg');

  if (loadingBarSvg !== null) {
    loadingBarSvg.remove();
  } else {
    developmentLog('Loading bar is null');
  }

  if (wrapper !== null) {
    wrapper.style.display = '';
  } else {
    developmentLog('Dock wrapper is null');
  }
};
