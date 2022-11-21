
export type _HTMLElement_ = {
  addClass: Function
  removeClass: Function
  replaceClass: Function
  hasClass: Function
  addProperty: Function
  hasProperty: Function
  getProperty: Function
} & HTMLElement & HTMLButtonElement & HTMLParagraphElement & HTMLLIElement & HTMLImageElement;

export type _HTMLObjectElement_<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K] & _HTMLElement_;
