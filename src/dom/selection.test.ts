import { createElement } from './create';
import { showSelection } from './selection';

describe('show/clearSelection', () => {
  it('showSelection', () => {
    const element: HTMLElement = createElement('div', 'test-selection');
    const type: string = 'selection';
    const canBeUnselected: boolean = false;

    showSelection(element, type, canBeUnselected);

    const _hasClass = element.classList.contains('selected-item');
    expect(_hasClass).toBe(true);

    let _hasType = element.hasAttribute(type);
    expect(_hasType).toBe(false);

    element.setAttribute(type, '');
    _hasType = element.hasAttribute(type);
    expect(_hasType).toBe(true);
  });
});
