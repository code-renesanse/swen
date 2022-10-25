import { ITranslation } from './language.model';

export interface ICacheInstance {
  [key: string]: object | string | ITranslation
}

export interface ICache {
  [key: string]: ICacheInstance
}
