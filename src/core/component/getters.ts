import { IApi } from '../../types';
import { IComponent } from './component.model';

// TODO: replace configuration_components list to configuration_components_map
/**
 *
 * @param {String} id
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns API Component || -1 if component with id does not exist
 */
export const getComponentFromId = (
  id: string,
  api: IApi
): IComponent | undefined => {
  return api.configuration_components
    .filter((component) => component.id === id)
    .at(0);
};
