
/**
 * Depricated
 * All of these functions were implemented in createElement function in src/dom/createElement
 */

// /**
//  *
//  * @param {DOMElement | String} domRef - reference to the dom
//  * @param {String} className class to add to DOM
//  * @returns boolean
//  */
// export const addClass = (domRef: HTMLElement, className: string | string[]): boolean => {
//   const dom = getDomFromReference(domRef);

//   if (dom === null || dom === undefined) {
//     errorLog('The dom is eather null or undefined');
//     return false;
//   }

//   if (Array.isArray(className)) {
//     for (const name of className) {
//       dom.classList.add(name);
//     }
//     return true;
//   } else {
//     dom.classList.add(className);
//     return true;
//   }
// };

// /**
//  *
//  * @param {DOMElement | String} domRef - reference to the dom
//  * @param {String} cls class to remove to DOM
//  * @returns boolean
//  */
// export const removeClass = (domRef: HTMLElement, cls: string | string[]): boolean => {
//   const dom = getDomFromReference(domRef);

//   if (dom === null || dom === undefined) {
//     errorLog('The dom is eather null or undefined');
//     return false;
//   }

//   if (Array.isArray(cls)) {
//     for (const name of cls) {
//       dom.classList.remove(name);
//     }
//     return true;
//   } else {
//     dom.classList.remove(cls);
//     return true;
//   }
// };

// /**
//  *
//  * @param {DOMElement} domRef - reference to the dom element
//  * @param {String} oldClass - class name to remove
//  * @param {String} newClass - class name to add
//  * @returns boolean
//  */
// export const replaceClass = (domRef: HTMLElement | string, oldClass: string, newClass: string): boolean => {
//   const dom = getDomFromReference(domRef);
//   if (dom === null || dom === undefined) {
//     errorLog('The dom is eather null or undefined');
//     return false;
//   }
//   dom.classList.replace(oldClass, newClass);
//   return true;
// };
