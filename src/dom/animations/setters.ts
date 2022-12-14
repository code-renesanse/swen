import { getDomFromReference } from '../getters';

/**
 *
 * @param {DOMElement | String} domRef = reference to the dom element
 * @param {String} animationName
 * @param {Number} animationDuration - in ms
 * @param {String} animationType - ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)
 * @returns
 */
export const setAnimation = (domRef: HTMLElement, animationName: string, animationDuration: string, animationType: string): string => {
  setAnimationName(domRef, animationName);
  setAnimationDuration(domRef, animationDuration);
  setAnimationTiminingFunction(domRef, animationType);
  return `${animationName} ${animationType} ${animationDuration}`;
};

export const setAnimationName = (domRef: HTMLElement, animationName: string): string => {
  const dom = getDomFromReference(domRef);
  dom.style.animationName = animationName;

  return animationName;
};

export const setAnimationDuration = (domRef: HTMLElement, animationDuration: string): string => {
  const dom = getDomFromReference(domRef);
  dom.style.animationDuration = animationDuration;

  return animationDuration;
};

export const setAnimationTiminingFunction = (domRef: HTMLElement, animationType: string): string => {
  const dom = getDomFromReference(domRef);
  dom.style.animationTimingFunction = animationType;

  return animationType;
};

export const setAnimationIterationCount = (domRef: HTMLElement, iterCount: string): string => {
  const dom = getDomFromReference(domRef);
  dom.style.animationIterationCount = iterCount;

  return iterCount;
};
