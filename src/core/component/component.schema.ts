import { getTranslation } from '../../languages';
import { errorLog } from '../../logger';
import { IApi } from '../../types';
import { SetupMap } from './component.model';

class ComponentSchema {
  name: string;

  SELECTION_KEY_PARENT: string;

  component: HTMLLIElement;

  content: HTMLUListElement;

  store: object;

  constructor(name: string) {
    this.name = name;

    this.SELECTION_KEY_PARENT = `${name}-parent`;

    this.component = document.createElement('li');
    this.component.id = `${this.name}-list-item`;

    this.content = document.createElement('ul');
    this.content.className = 'component-content';
    this.content.id = `${this.name}-content`;
    this.content.classList.add('visually-hidden');

    this.store = {};
  }

  setup(): SetupMap {
    return {};
  }

  load() {
    const elements = this.setup();
    for (const key in elements) {
      const element = elements[key];
      this.content.appendChild(element);
    }
  }

  getStore() {
    return this.store;
  }

  getContent() {
    return this.content;
  }

  getComponentName() {
    return this.name;
  }

  disable() {
    const buttons =
      this.component.querySelectorAll<HTMLButtonElement>('button');

    buttons.forEach((button) => (button.disabled = true));
    return this.component;
  }

  enable() {
    const buttons = this.component.querySelectorAll('button');

    buttons.forEach((button) => (button.disabled = false));
    return this.component;
  }

  languageUpdate(api: IApi) {
    const elements = this.component.querySelectorAll('[translation-key]');
    elements.forEach((element) => {
      const translationKey = element.getAttribute('translation-key');

      if (translationKey === undefined || translationKey === '') {
        errorLog(
          `${this.name}: Element with id ${element.id} does not have a valid translation-key attribute`
        );
        return;
      }

      const translationString = getTranslation(api, translationKey);
      element.textContent = translationString ?? 'error404';
    });
  }

  render() {
    const WRAPPER = document.querySelector<HTMLUListElement>('#dock-wrapper');

    if (WRAPPER === null) {
      return errorLog('dock-wrapper is null');
    }

    const listItemButton = document.createElement('button');
    listItemButton.id = `${this.name}-list-item-button`;
    listItemButton.textContent = this.name;
    listItemButton.addEventListener('click', () => {
      if (listItemButton.disabled) return;
      const className = 'visually-hidden';

      document.querySelectorAll('.component-content').forEach((content) => {
        content.classList.add(className);
      });

      if (this.content.classList.contains(className)) {
        this.content.classList.remove(className);
      } else {
        this.content.classList.add(className);
      }
    });

    this.component.appendChild(listItemButton);
    this.component.appendChild(this.content);

    return WRAPPER.appendChild(this.component);
  }
}

export default ComponentSchema;
