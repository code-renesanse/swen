import { IApi } from '../../types';
import { setAnimation } from '../animations/setters';
import { getDomFromReference } from '../getters';

/**
 *
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export const openConfiguratorMenu = (api: IApi): void => {
  const container = getDomFromReference('container');
  const wrapper = getDomFromReference('dock-wrapper');
  const configFinish = getDomFromReference('configuration-finish');

  container.removeClass(
    'p-0',
    'w-0'
  );

  configFinish.removeClass('button-selected');

  setAnimation(container, 'extendWidth', api.animation_speed.toString(), 'linear');

  setTimeout(() => {
    wrapper.removeClass('opaque', 'overflow-hidden');
  }, api.animation_speed);
};

/**
*
* @param {Sketchfab API object} api - JSON object holding all application data
*/
export const closeConfiguratorMenu = (api: IApi): void => {
  const container = getDomFromReference('container');
  const wrapper = getDomFromReference('dock-wrapper');

  const animationSpeed = api.animation_speed;

  if (!api.is_mobile) {
    if (!container.classList.contains('w-0')) {
      wrapper.addClass(
        'opaque',
        'overflow-hidden'
      );

      setAnimation(container, 'extendWidthBack', `${animationSpeed}ms`, 'linear');

      setTimeout(() => {
        container.addClass(
          'p-0',
          'w-0'
        );
      }, animationSpeed);
    }
  }
};
