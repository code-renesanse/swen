/**
 *
 * @param {String} type DOM type
 * @param {String} id DOM id
 * @returns newly created DOM element
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  type: K,
  id: string
): HTMLElementTagNameMap[K] => {
  const element = document.createElement<K>(type);
  element.id = id;
  return element;
};
