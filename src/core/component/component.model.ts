import { IApi } from '../../types/api.model';

export interface IComponent {
  updateLang(api: IApi): unknown;
  api: IApi;
  id: string;
  name: string;
  // this.translation;
  subelements: HTMLElement;
  dockElement: HTMLElement;
  title: HTMLElement;
  content: HTMLElement;
  enable: () => void;
  disable: () => void;
  addSubElement: (element: HTMLElement | Element) => void;
  addSubElements: (...elementList: HTMLElement[] | Element[]) => void;
  getComponentName: () => string;
  customLangUpdate: () => string;
  updateLanguage: () => void;
}
