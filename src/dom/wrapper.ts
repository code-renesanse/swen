import { createElement } from './create';

export const createEmptyWrapper = (): HTMLDivElement => {
  const wrapper = createElement('div', 'wrapper');
  const wrapperContainer = createElement('div', 'wrapper-container');
  const dockWrapper = createElement('ul', 'dock-wrapper');
  const langButtonHolder = createElement('div', 'language-button-holder');

  wrapperContainer.appendChild(dockWrapper);
  wrapperContainer.appendChild(langButtonHolder);

  wrapper.appendChild(wrapperContainer);
  return wrapper;
};
