import { Application } from '../application/application';
import {
  createCardLoadHolder,
  createHTMLButton,
  createLoadingbar,
  getDomFromReference,
} from '../../dom';
import { errorLog, mustImplementFunction } from '../../logger';
import { IApi } from '../../types';
import ComponentSchema from '../component/component.schema';

export class Card {
  modelid: string;

  CARD_HOLDER: HTMLLIElement | null = null;

  BUTTON: HTMLButtonElement | null = null;

  configurator: Application;

  constructor(cardTitle: string, modelid: string, configurator: Application) {
    this.modelid = modelid;
    this.configurator = configurator;

    const HOLDER = document.querySelector<HTMLLIElement>(
      '#model-selection-holder'
    );

    if (HOLDER === null) {
      errorLog('model-selection-holder');
      return;
    }

    this.CARD_HOLDER = createCardLoadHolder(`card-load-${modelid}`, cardTitle);

    this.BUTTON = createHTMLButton(
      `card-button-${modelid}`,
      `model-${modelid}`,
      configurator.API
    );

    this.CARD_HOLDER.appendChild(this.BUTTON);

    this.CARD_HOLDER.addEventListener('click', () => {
      void (async () => {
        await this.load(modelid, HOLDER, configurator.API);
      })();
    });

    if (HOLDER !== null) {
      HOLDER.appendChild(this.CARD_HOLDER);
    } else {
      errorLog('model-selection-holder is null');
    }
  }

  /**
   * This is the load function of the card
   */
  async load(modelid: string, HOLDER: HTMLLIElement, api: IApi): Promise<void> {
    await (async () => {
      await createLoadingbar(api);

      if (HOLDER !== null) {
        HOLDER.remove();
      } else {
        errorLog('model-selection-holder is null');
      }

      const apiFrameHolder = getDomFromReference('api-frame-holder');
      if (apiFrameHolder !== null) {
        apiFrameHolder.classList.remove('visually-hidden');
      } else {
        errorLog('apiFrameHolder is null');
      }

      this.configurator.setCurrentModelId(modelid);
      await this.configurator.loadModel(modelid);
    })();
  }

  addConfigurationComponent(component: ComponentSchema, api: IApi): void {
    if (api.component_load_map == undefined) {
      api.component_load_map = {};
    }
    api.component_load_map[component.getComponentName()] = component;
  }

  setModelConfiguration(_api: IApi): void {
    mustImplementFunction('setModelConfiguration');
  }

  setup(_api: IApi): void {
    mustImplementFunction('loadDefaultConfiguration');
  }
}
