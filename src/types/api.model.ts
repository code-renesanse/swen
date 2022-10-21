import { ComponentClass } from './component.model';
import { Dictionary } from './dictionary.model';
import { SketchfabModelElement } from './element.model';
import { Language, Translation } from './language.model';

export interface ConfigurationComponentMap {
  [key: string]: (parent: ComponentClass, api: API) => void
}

export interface API {
  currentModelId: string
  imageDictionary: Dictionary<string>
  componentDictionary: Dictionary<SketchfabModelElement>
  modelsList: string[]
  animationSpeed: number
  languages: Language
  TRANSLATOR: Translation
  COMPONENTS: ComponentClass[]
  configurationComponentsMap: ConfigurationComponentMap
  getters: object
  show: (id: string) => void
  hide: (id: string) => void
}
