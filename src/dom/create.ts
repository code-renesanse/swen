/**
 *
 * @param {String} type DOM type
 * @param {String} id DOM id
 * @returns newly created DOM element
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(type: K, id: string): HTMLElementTagNameMap[K] => {
  const e = document.createElement(type);
  e.id = id;
  return e;
};
