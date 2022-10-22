import { API, ComponentClass } from '../../types';

// TODO: replace configuration_components list to configuration_components_map
/**
 *
 * @param {String} id
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @returns API Component || -1 if component with id does not exist
 */
export const getComponentFromId = (id: string, api: API): ComponentClass | null => {
  for (let i = 0; i < api.configuration_components.length; i++) {
    if (api.configuration_components[i].id === id) {
      return api.configuration_components[i];
    }
  }
  return null;
};
