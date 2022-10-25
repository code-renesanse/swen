
// TODO: defaultConfig refactor !!

import { IApi } from '../types';

/**
 *
 * @param {String} key
 * @param {String||Boolean} value
 * @param {*} api
 * @returns
 */
export const setConfigKeyValuePair = (key: string, value: object, api: IApi): void => {
  api.configuration[key] = value;
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
