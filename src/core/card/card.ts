import { _Application_ } from '../application/application';
import { createCardLoadHolder, createImageHolder, createLoadingbar, getDomFromReference } from '../../dom';
import { errorLog, mustImplementFunction } from '../../logger';
import { IApi } from '../../types';
import { IComponent } from '../component';

export class _Card_ {
  modelid: string;

  constructor (modelid: string, configuratorRef: _Application_) {
    // validateConfigurator(configuratorRef);
    this.modelid = modelid;

    const HOLDER = document.querySelector('#model-selection-holder');
    const CARD_HOLDER = createCardLoadHolder(`card-load-${modelid}`, `Load boat model ${modelid}`);

    const cardImg = createImageHolder(modelid, `model${modelid}`, configuratorRef.API);

    CARD_HOLDER.appendChild(cardImg);

    // CARD_HOLDER.addEventListener('click', async () => await loadModel(configuratorRef, modelId, HOLDER));
    CARD_HOLDER.addEventListener('click', () => {
      void (async () => {
        await createLoadingbar(configuratorRef.API);

        if (HOLDER !== null) {
          HOLDER.remove();
        } else {
          errorLog('model-selection-holder is null');
        }

        const apiFrameHolder = getDomFromReference('api-frame-holder');
        if (apiFrameHolder !== null) {
        //   apiFrameHolder.classList.replace('d-none', 'd-flex');
          apiFrameHolder.style.display = 'flex';
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

  addConfigurationComponent (id: string, component: (parent: IComponent, api: IApi) => void, api: IApi): void {
    // if (!(api.configuration_components_map)) {
    //   api.configuration_components_map = {};
    // }
    api.component_load_map[id] = (parent, api) => component(parent, api);
  }

  setModelConfiguration (_api: IApi): void {
    mustImplementFunction('setModelConfiguration');
  }

  // TODO: rename to SETUP
  loadDefaultConfiguration (_api: IApi): void {
    mustImplementFunction('loadDefaultConfiguration');
  }
}
