
// TODO: defaultConfig refactor !!

import { API } from '../types';

/**
 *
 * @param {String} key
 * @param {String||Boolean} value
 * @param {*} api
 * @returns
 */
export const setConfigKeyValuePair = (key: string, value: object, api: API): void => {
  api.configuration[key] = value;
};

/**
 *
 * @param {String} key
 * @param {*} api
 * @returns
 */
export const getConfigFromKey = (key: string, api: API): object => {
  return api.configuration[key];
};
