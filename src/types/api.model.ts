import { IComponent } from './component.model';
import { Dictionary } from './dictionary.model';
import { ISketchfabModelElement } from './element.model';
import { ILanguage, ITranslation } from './language.model';

export interface IConfigurationComponentMap {
  [key: string]: (parent: IComponent, api: IApi) => void
}

export interface IApi {
  currentModelId: string
  image_dictionary: Dictionary<string>
  model_dictionary: Dictionary<ISketchfabModelElement>
  model_map: { [key: string]: string }
  configuration: { [key: string]: object }
  animation_speed: number
  languages: ILanguage
  translator: ITranslation
  configuration_components: IComponent[]
  is_mobile: boolean
  configuration_components_map: IConfigurationComponentMap
  // getters: object
  show: (id: string) => void
  hide: (id: string) => void
  start: (fun: () => void) => void
  getSceneGraph: (fun: (err: object, graph: object) => void | Promise<void>) => void | Promise<void>
  addEventListener: (type: string, fun: () => void | Promise<void>) => void
}
