import { Application } from './application';
import { createCardLoadHolder, createImageHolder, createLoadingbarGif } from '../dom';
import { wordsSpin } from '../languages';
import { errorLog, mustImplementFunction } from '../logger';
import { API, ComponentClass } from '../types';

export class Card {
  modelid: string;

  constructor (modelid: string, configuratorRef: Application) {
    // validateConfigurator(configuratorRef);
    this.modelid = modelid;

    const HOLDER = document.querySelector('#model-selection-holder');
    const CARD_HOLDER = createCardLoadHolder(`card-load-${modelid}`, `Load boat model ${modelid}`);

    const cardImg = createImageHolder(modelid, `model${modelid}`, configuratorRef.API);

    CARD_HOLDER.appendChild(cardImg);

    // CARD_HOLDER.addEventListener('click', async () => await loadModel(configuratorRef, modelId, HOLDER));
    CARD_HOLDER.addEventListener('click', () => {
      void (async () => {
        await createLoadingbarGif(configuratorRef.API);
        await wordsSpin(configuratorRef.API);
        if (HOLDER !== null) {
          HOLDER.remove();
        } else {
          errorLog('model-selection-holder is null');
        }

        const apiFrameHolder = document.querySelector('#api-frame-holder');
        if (apiFrameHolder !== null) {
          apiFrameHolder.classList.replace('d-none', 'd-flex');
        } else {
          errorLog('apiFrameHolder is null');
        }

        configuratorRef.setCurrentModelId(modelid);
        await configuratorRef.loadModel(modelid, configuratorRef.API);
      })();
    });

    if (HOLDER !== null) {
      HOLDER.appendChild(CARD_HOLDER);
    } else {
      errorLog('model-selection-holder is null');
    }
  }

  addConfigurationComponent (id: string, component: (parent: ComponentClass, api: API) => void, api: API): void {
    // if (!(api.configuration_components_map)) {
    //   api.configuration_components_map = {};
    // }
    api.configuration_components_map[id] = (parent, api) => component(parent, api);
  }

  setModelConfiguration (_api: API): void {
    mustImplementFunction('setModelConfiguration');
  }

  // TODO: rename to SETUP
  loadDefaultConfiguration (_api: API): void {
    mustImplementFunction('loadDefaultConfiguration');
  }
}
