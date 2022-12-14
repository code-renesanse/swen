import { errorLog } from '../logger';

/**
 *
 * @param {DOM Element || String} domRef - a reference to the dom element
 * @returns HTMLElement
 */
export const getDomFromReference = (domRef: HTMLElement | string): HTMLElement => {
  if (typeof domRef === 'string') {
    const outId: string = `#${domRef}`;
    const result = document.querySelector<HTMLElement>(outId);

    if (result !== null) {
      return result;
    }
    errorLog(`${outId} is not a valid dom reference`);
  } else if (domRef instanceof Element) {
    return domRef;
  }

  errorLog('Dom reference is neither a dom string id nor an instance of an element');
  return document.createElement('p');
};

/**
 *
 * @param {DOM Element | String} domRef - reference to the dom element
 * @returns string id of the dom element
 */
export const getId = (domRef: HTMLElement): string => {
  const { id } = getDomFromReference(domRef);
  return id;
};
