import { ComponentClass } from './component.model';
import { Dictionary } from './dictionary.model';
import { SketchfabModelElement } from './element.model';
import { Language, Translation } from './language.model';

export interface ConfigurationComponentMap {
  [key: string]: (parent: ComponentClass, api: API) => void
}

export interface API {
  currentModelId: string
  image_dictionary: Dictionary<string>
  model_dictionary: Dictionary<SketchfabModelElement>
  model_map: { [key: string]: string }
  configuration: { [key: string]: object }
  animation_speed: number
  languages: Language
  translator: Translation
  configuration_components: ComponentClass[]
  is_mobile: boolean
  configuration_components_map: ConfigurationComponentMap
  // getters: object
  show: (id: string) => void
  hide: (id: string) => void
  start: (fun: () => void) => void
  getSceneGraph: (fun: (err: object, graph: object) => void | Promise<void>) => void | Promise<void>
  addEventListener: (type: string, fun: () => void | Promise<void>) => void
}
