import { _HTMLElement_ } from '../dom.model';
import { getDomFromReference } from '../getters';

/**
 * Enables the refered button dom
 * @param {String|DOM element} btnRef - reference to the button dom element to be enabled
 */
export const enableHTMLButton = (btnRef: string | HTMLButtonElement): void => {
  const btn = getDomFromReference(btnRef as _HTMLElement_);
  btn.removeClass('disabled');
  btn.disabled = false;
};

/**
 * Disables the refered button dom
 * @param {String||DOM element} btnRef - a reference to the button that will be disabled
 */
export const disableHTMLButton = (btnRef: string | HTMLButtonElement): void => {
  const btn = getDomFromReference(btnRef as _HTMLElement_);
  btn.addClass('disabled');
  btn.disabled = true;
};

// TODO: fix showSelection
// export const selectUnselectButtonFunction = (out: string | _HTMLElement_, event: HTMLElementEventMap['click']): void => {
//   const btn = getDomFromReference(out);
//   const type = 'select-unselect';
//   if (btn.classList.contains('bold') || btn.id === 'rts-btn') {
//     if ((event.target as _HTMLElement_).id !== btn.id && (event.target as _HTMLElement_)?.parentElement?.id !== btn.id) {
//       clearSelection(type);
//     }
//   } else {
//     showSelection(out, type, true);
//   }
//   btn.addProperty(type);
// };
