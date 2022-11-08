import { IApi } from '../../types/api.model';

export interface IComponent {
  api: IApi
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
  customLangUpdate: (api: IApi) => void
  updateLang: (api: IApi) => void
}
