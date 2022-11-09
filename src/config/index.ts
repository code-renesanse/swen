
// TODO: defaultConfig refactor !!
// TODO: a proper return type for setConfigKeyValuePair
// TODO: a proper return type for getConfigKeyValuePair
import { IApi } from '../types';

/**
 *
 * @param {String} key
 * @param {String||Boolean} value
 * @param {*} api
 * @returns
 */
export const setConfigKeyValuePair = <O extends object>(key: string, value: O, api: IApi): O => {
  api.configuration[key] = value;
  return value;
};

/**
 *
 * @param {String} key
 * @param {*} api
 * @returns
 */
export const getConfigFromKey = (key: string, api: IApi): object => {
  return api.configuration[key];
};
