import { createElement } from './create';

export const createEmptyWrapper = (): HTMLDivElement => {
  const _wrapper = createElement('div', 'wrapper');
  const _wrapperContainer = createElement('div', 'wrapper-container');
  const _dockWrapper = createElement('div', 'dock-wrapper');
  const _langButtonHolder = createElement('div', 'language-button-holder');

  _wrapperContainer.appendChild(_dockWrapper);
  _wrapperContainer.appendChild(_langButtonHolder);

  _wrapper.appendChild(_wrapperContainer);
  return _wrapper;
};
