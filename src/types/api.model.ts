import { IComponent } from '../core/component/component.model';
import { Dictionary } from './dictionary.model';
import { ISketchfabModelElement } from './element.model';
import { ILanguage, ITranslation } from './language.model';

export type IComponentLoadMap = Record<
  string,
  (parent: IComponent, api: IApi) => void
>;

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
  configuration_components: IComponent[];
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
