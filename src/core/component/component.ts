import { createSubelementsHolder, getDomFromReference } from '../../dom';
import { getTranslation } from '../../languages';
import { developmentLog, errorLog } from '../../logger';
import { IApi } from '../../types';
import {
  createDockItem,
  createDockItemContent,
  createDockTitleButton,
} from '../../dock/functions';
import { IComponent } from './component.model';

export class Component implements IComponent {
  subelements!: HTMLElement;

  dockItem!: HTMLElement;

  title!: HTMLButtonElement;

  content!: HTMLDivElement;

  name!: string;

  id!: string;

  api!: IApi;

  /**
   *
   * @param {string} id - id of the component
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  // TODO: make the dock wrapper an argument or maybe append dock wrapper reference to the api object
  constructor(id: string, api: IApi) {
    this.name = getTranslation(api, id) ?? 'error404';
    this.id = id;

    this.api = api;
    this.subelements = createSubelementsHolder(id);

    this.dockItem = createDockItem();

    this.title = createDockTitleButton(api, id);

    this.content = createDockItemContent(this.subelements);

    this.dockItem.appendChild(this.title);
    this.dockItem.appendChild(this.content);

    const dockWrapper = getDomFromReference('dock-wrapper');

    // This is the initailization of a component that is defined in each model (card)
    if (api.component_load_map[id] instanceof Function) {
      dockWrapper.appendChild(this.dockItem);
      api.component_load_map[id](this, api);
    }
  }

  /**
   * This functions enables user interaction with the component DOM
   */
  enable(): void {
    this.title.disabled = false;
    this.title.classList.replace('disabled', 'button-hover');
  }

  /**
   * This function disables user interaction with the component DOM
   */
  disable(): void {
    this.title.disabled = true;
    this.title.classList.replace('button-hover', 'disabled');
  }

  /**
   * Appends a child dom element to the main component DOM
   * @param {dom element} btn - dom element that is added as a child of the main component element
   */
  addSubElement(element: HTMLElement | Element): void {
    if (element !== null && element !== undefined) {
      if (element instanceof Element) {
        this.subelements.appendChild(element);
      } else {
        developmentLog('The given element is not a DOM Element');
      }
    }
  }

  addSubElements(...elementList: HTMLElement[] | Element[]): void {
    elementList.forEach((e) => this.addSubElement(e));
  }

  /**
   * Returns the compnent name
   * @returns string
   */
  getComponentName(): string {
    return this.name;
  }

  /**
   * This function handles custom language updates
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  customLangUpdate(): string {
    return '';
  }

  /**
   * Updates the language of the component and all of it's sub elements
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  // TODO: make it a promise or something similar
  updateLanguage(): void {
    const elements = this.dockItem.querySelectorAll('[translation-key]');
    elements.forEach((element) => {
      const translationKey = element.getAttribute('translation-key');

      if (translationKey === undefined || translationKey === '') {
        errorLog(
          `${this.id}: Element with id ${element.id} does not have a valid translation-key attribute`
        );
        return;
      }

      const translationString = getTranslation(this.api, translationKey);
      element.textContent = translationString ?? 'error404';
    });
  }
}
