import { API } from '../../types';
import { setAnimation } from '../animations/setters';
import { addClass, removeClass } from '../class';
import { getDomFromReference } from '../getters';

/**
 *
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export const openConfiguratorMenu = (api: API): void => {
  const container = getDomFromReference('container');
  const wrapper = getDomFromReference('dock-wrapper');
  const configFinish = getDomFromReference('configuration-finish');

  removeClass(container, [
    'p-0',
    'w-0'
  ]);

  removeClass(configFinish, 'button-selected');

  setAnimation(container, 'extendWidth', api.animation_speed.toString(), 'linear');

  setTimeout(() => {
    removeClass(wrapper, [ 'opaque', 'overflow-hidden' ]);
  }, api.animation_speed);
};

/**
*
* @param {Sketchfab API object} api - JSON object holding all application data
*/
export const closeConfiguratorMenu = (api: API): void => {
  const container = getDomFromReference('container');
  const wrapper = getDomFromReference('dock-wrapper');

  const animationSpeed = api.animation_speed;

  if (!api.is_mobile) {
    if (!container.classList.contains('w-0')) {
      addClass(wrapper, [
        'opaque',
        'overflow-hidden'
      ]);

      setAnimation(container, 'extendWidthBack', `${animationSpeed}ms`, 'linear');

      setTimeout(() => {
        addClass(container, [
          'p-0',
          'w-0'
        ]);
      }, animationSpeed);
    }
  }
};
