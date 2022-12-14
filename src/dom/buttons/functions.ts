import { addClass, removeClass } from '../class';
import { getDomFromReference } from '../getters';
import { clearSelection, showSelection } from '../selection';

/**
 * Enables the refered button dom
 * @param {String|DOM element} btnRef - reference to the button dom element to be enabled
 */
export const enableHTMLButton = (btnRef: string | HTMLButtonElement): void => {
  const btn = getDomFromReference(btnRef) as HTMLButtonElement;
  removeClass(btn, 'disabled');
  btn.disabled = false;
};

/**
 * Disables the refered button dom
 * @param {String||DOM element} btnRef - a reference to the button that will be disabled
 */
export const disableHTMLButton = (btnRef: string | HTMLButtonElement): void => {
  const btn = getDomFromReference(btnRef) as HTMLButtonElement;
  addClass(btn, 'disabled');
  btn.disabled = true;
};

export const selectUnselectButtonFunction = (out: string | HTMLElement, event: HTMLElementEventMap['click']): void => {
  const btn = getDomFromReference(out);
  if (btn.classList.contains('bold') || btn.id === 'rts-btn') {
    if ((event.target as HTMLElement).id !== btn.id && (event.target as HTMLElement)?.parentElement?.id !== btn.id) {
      clearSelection(out);
    }
  } else {
    showSelection(out);
  }
};
