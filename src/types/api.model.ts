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
  configuration: object
  animationSpeed: number
  languages: Language
  TRANSLATOR: Translation
  COMPONENTS: ComponentClass[]
  configurationComponentsMap: ConfigurationComponentMap
  // getters: object
  show: (id: string) => void
  hide: (id: string) => void
  start: (fun: () => void) => void
  getSceneGraph: (fun: (err: object, graph: object) => void | Promise<void>) => void | Promise<void>
  addEventListener: (type: string, fun: () => void | Promise<void>) => void
}
