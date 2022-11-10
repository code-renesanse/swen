
export type HTMLObjectElement<K extends keyof HTMLElementTagNameMap> = {
  addClass: Function
  removeClass: Function
  replaceClass: Function
} & HTMLElementTagNameMap[K];

export type _HTMLElement_ = {
  addClass: Function
  removeClass: Function
  replaceClass: Function
} & HTMLElement & HTMLButtonElement & HTMLParagraphElement & HTMLLIElement & HTMLImageElement;
