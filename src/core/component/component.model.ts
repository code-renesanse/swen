import { IApi } from '../../types/api.model';

export interface IComponent {
  api: IApi;
  id: string;
  name: string;
  subelements: HTMLElement;
  dockItem: HTMLElement;
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
