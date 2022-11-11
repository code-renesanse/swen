
export type _HTMLElement_ = {
  addClass: Function
  removeClass: Function
  replaceClass: Function
} & HTMLElement & HTMLButtonElement & HTMLParagraphElement & HTMLLIElement & HTMLImageElement;

export type _HTMLObjectElement_<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K] & _HTMLElement_;
