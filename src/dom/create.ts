import { _HTMLObjectElement_ } from './dom.model';

/**
 *
 * @param {String} type DOM type
 * @param {String} id DOM id
 * @returns newly created DOM element
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(type: K, id: string): _HTMLObjectElement_<K> => {
  const _element = document.createElement(type) as _HTMLObjectElement_<K>;
  _element.id = id;
  _element.addClass = (...list: string[]) => {
    if (list !== undefined) {
      list.forEach(_item => _element.classList.add(_item));
    }
  };
  _element.removeClass = (...list: string[]) => {
    if (list !== undefined) {
      list.forEach(_item => _element.classList.remove(_item));
    }
  };
  _element.replaceClass = (_first: string, _second: string) => {
    _element.classList.replace(_first, _second);
  };
  return _element;
};
