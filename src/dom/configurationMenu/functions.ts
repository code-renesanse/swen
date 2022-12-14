import { IApi } from '../../types';

/**
 *
 * @param {Sketchfab API object} api - JSON object holding all application data
 */
export const openConfiguratorMenu = (_api: IApi): void => {
  console.error('Depricted function');

  // const container = getDomFromReference('container');
  // const wrapper = getDomFromReference('dock-wrapper');
  // const configFinish = getDomFromReference('configuration-finish');

  // setAnimation(container, 'extendWidth', api.animation_speed.toString(), 'linear');
};

/**
*
* @param {Sketchfab API object} api - JSON object holding all application data
*/
export const closeConfiguratorMenu = (_api: IApi): void => {
  console.error('Depricated function');
  // const container = getDomFromReference('container');
  // const wrapper = getDomFromReference('dock-wrapper');

  // const animationSpeed = api.animation_speed;

  // if (!api.is_mobile) {
  //   if (!container.classList.contains('w-0')) {
  //     setAnimation(container, 'extendWidthBack', `${animationSpeed}ms`, 'linear');
  //   }
  // }
};
