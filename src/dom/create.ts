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

  _element.hasClass = (className: string) => {
    return _element.classList.contains(className);
  };

  _element.addProperty = (property: string, _value: string) => {
    _element.setAttribute(property, _value);
    return property;
  };

  _element.hasProperty = (property: string) => {
    return _element.hasAttribute(property);
  };

  _element.getProperty = (property: string) => {
    if (_element.hasProperty(property) === false) {
      return `${property} does not exist on this element`;
    }
    return _element.getAttribute(property);
  };

  return _element;
};
