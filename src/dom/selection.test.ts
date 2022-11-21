import { createElement } from './create';
import { _HTMLElement_ } from './dom.model';
import { showSelection } from './selection';

describe('show/clearSelection', () => {
  it('showSelection', () => {
    const element: _HTMLElement_ = createElement('div', 'test-selection');
    const type: string = 'selection';
    const canBeUnselected: boolean = false;

    showSelection(element, type, canBeUnselected);

    const _hasClass = element.hasClass('selected-item');
    expect(_hasClass).toBe(true);

    let _hasType = element.hasAttribute(type);
    expect(_hasType).toBe(false);

    element.setAttribute(type, '');
    _hasType = element.hasAttribute(type);
    expect(_hasType).toBe(true);
  });
});
