import { Component } from '../core';
import { Dictionary } from './dictionary.model';
import { ISketchfabModelElement } from './element.model';
import { ILanguage, ITranslation } from './language.model';

export type IComponentLoadMap = {
  [key: string]: Component;
};

// TODO: remove configuration_components array <=> no uses for configuration_components array
export interface IApi {
  currentModelId: string;
  image_dictionary: Dictionary<string>;
  model_dictionary: Dictionary<ISketchfabModelElement>;
  model_map: Record<string, string>;
  configuration: Record<string, object>;
  animation_speed: number;
  languages: ILanguage;
  translator: ITranslation;
  is_mobile: boolean;
  component_load_map: IComponentLoadMap;
  // getters: object
  show: (id: string) => void;
  hide: (id: string) => void;
  start: (fun: () => void) => void;
  getSceneGraph: (
    fun: (err: object, graph: object) => void | Promise<void>
  ) => void | Promise<void>;
  addEventListener: (type: string, fun: () => void | Promise<void>) => void;
}
