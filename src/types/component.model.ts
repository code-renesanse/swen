import { API } from './api.model';

export interface ComponentClass {
  api: API
  id: string
  name: string
  // this.translation;
  subelements: HTMLElement
  dockElement: HTMLElement
  title: HTMLElement
  dockItem: HTMLElement
  enable: () => void
  disable: () => void
  addSubElement: (element: HTMLElement | Element) => void
  addSubElements: (...elementList: HTMLElement[] | Element[]) => void
  getComponentName: () => string
  customLangUpdate: (api: API) => void
  updateLang: (api: API) => void
}
