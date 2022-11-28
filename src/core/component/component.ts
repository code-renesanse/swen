import { createSubelementsHolder, getDomFromReference, _HTMLElement_ } from '../../dom';
import { getTranslation } from '../../languages';
import { developmentLog, errorLog } from '../../logger';
import { IApi } from '../../types';
import { createDockItem, createDockItemContent, createDockTitleButton } from '../../dock/functions';
import { IComponent } from './component.model';

export class _Component_ implements IComponent {
  subelements: _HTMLElement_;
  dockElement: _HTMLElement_;
  title: HTMLButtonElement;
  dockItem: HTMLDivElement;
  name: string;
  id: string;
  api: IApi;

  /**
     *
     * @param {string} id - id of the component
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  // TODO: make the dock wrapper an argument or maybe append dock wrapper reference to the api object
  constructor (id: string, api: IApi) {
    this.name = getTranslation(api, id);
    this.id = id;

    this.api = api;
    this.subelements = createSubelementsHolder(id);

    this.dockElement = createDockItem();

    this.title = createDockTitleButton(api, id, this.dockElement);

    this.dockItem = createDockItemContent(this.subelements);

    this.dockElement.appendChild(this.title);
    this.dockElement.appendChild(this.dockItem);

    const dockWrapper = getDomFromReference('dock-wrapper');
    if (dockWrapper === null) {
      errorLog('dock-wrapper does not exist');
      return;
    }

    dockWrapper.appendChild(this.dockElement);

    // This is the initailization of a component that is defined in each model (card)
    api.component_load_map[id](this, api);
  }

  /**
     * This functions enables user interaction with the component DOM
     */
  enable (): void {
    this.title.disabled = false;
    this.title.classList.replace('disabled', 'button-hover');
  }

  /**
     * This function disables user interaction with the component DOM
     */
  disable (): void {
    this.title.disabled = true;
    this.title.classList.replace('button-hover', 'disabled');
  }

  /**
     * Appends a child dom element to the main component DOM
     * @param {dom element} btn - dom element that is added as a child of the main component element
     */
  addSubElement (element: HTMLElement | Element): void {
    if (element !== null && element !== undefined) {
      if (element instanceof Element) {
        this.subelements.appendChild(element);
      } else {
        developmentLog('The given element is not a DOM Element');
      }
    }
  }

  addSubElements (...elementList: HTMLElement[] | Element[]): void {
    elementList.forEach(e => this.addSubElement(e));
  }

  /**
     * Returns the compnent name
     * @returns string
     */
  getComponentName (): string {
    return this.name;
  }

  /**
     * This function handles custom language updates
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  customLangUpdate (_api: IApi): void {

  }

  /**
     * Updates the language of the component and all of it's sub elements
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  // TODO: make it a promise or something similar
  updateLang (): void {
    setTimeout(() => {
      this.title.textContent = getTranslation(this.api, this.id);
      const subElements = Array.from(this.subelements.children);
      const currentLanguage: string = this.api.translator.lang;

      for (const node of subElements) {
        if (node.nodeName === 'UL') {
          const listNodes = Array.from(node.children);
          for (const listNode of listNodes) {
            if (listNode.tagName.toLocaleLowerCase() === 'button') {
              const id: string = listNode.id;

              if (id === '' || id === null) {
                errorLog('The id of the node is null or not defined');
                return;
              }

              listNode.children[1].textContent = getTranslation(this.api, id) !== '' ? getTranslation(this.api, id) : '';

              if (getTranslation(this.api, id) === '') {
                listNode.remove();
                errorLog(`EROOR: VLAUE NOT IN LANG FILE FOR LANG ${currentLanguage}`);
              }
            } else {
              const id = listNode.id.split('-')[listNode.id.split('-').length - 1];
              listNode.children[0].children[1].textContent = getTranslation(this.api, id) !== '' ? getTranslation(this.api, id) : '';

              if (getTranslation(this.api, id) === '') {
                listNode.remove();
                errorLog(`EROOR: VLAUE NOT IN LANG FILE FOR LANG ${currentLanguage}`);
              }
            }
          }
        } else {
          if (node.children.length > 0) {
            const translation = getTranslation(this.api, node.id);
            if (node.children[1] !== null && node.children[1] !== undefined) {
              node.children[1].textContent = translation;
            } else {
              node.children[0].textContent = translation;
            }
          }
        }
      }

      this.customLangUpdate(this.api);
    });
  }
}
