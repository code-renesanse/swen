/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { hideLoadingBar } from '../../dom';
import { buildComponentDictionary } from '../../dictionary';
import {
  developmentLog,
  errorLog,
  log,
  mustImplementFunction,
} from '../../logger';
import { IApi, Dictionary, ISketchfabModelElement } from '../../types';
import {
  getLangFromURL,
  loadNewTransllationFiles,
  Translator,
} from '../../languages';
import { Card } from '../card';
import { IComponent } from '../component';
import { createEmptyWrapper } from '../../dom/wrapper';

declare const window: any;

export class Application {
  appName!: string;

  MAIN!: HTMLDivElement;

  API_FRAME!: HTMLIFrameElement;

  isMobile!: boolean;

  CARDS!: {
    [key: string]: Card;
  };

  API!: IApi;

  DICTIONARY_BUILDFUNCTION!: (
    graph: object
  ) => Promise<Dictionary<ISketchfabModelElement>>;

  CLIENT!: any;

  GRAPH!: object;

  constructor(appName: string) {
    if (
      process.env.APP_NAME === null ||
      process.env.APP_NAME === undefined ||
      process.env.APP_NAME === ''
    ) {
      errorLog('APP_NAME enviromet variable must be set');
      return;
    }
    this.appName = appName;

    this.MAIN = document.querySelector('#app') as HTMLDivElement;
    this.API_FRAME = this.createAPIFrame();

    // TODO: look more into this
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // this.GRAPH;
    // this.translator;

    this.CARDS = {};

    /**
     * This setst the default build configuration function the the one that is implemented in the engine
     * @param {Sketchfab GRAPH object} graph
     */
    this.DICTIONARY_BUILDFUNCTION = async (graph) =>
      buildComponentDictionary(graph);
  }

  setCurrentModelId(modelId: string): void {
    this.API.currentModelId = modelId;
  }

  // TODO: implement model CARDS
  addCard(cardRef: Card): void {
    this.CARDS[cardRef.modelid] = cardRef;
  }

  /**
   * This is called when the page loads
   * @param {Sketchfab API object} api - JSON object holding all application data
   */

  async onPageLoad(_api: IApi): Promise<void> {
    mustImplementFunction('onPageLoad');
  }

  /**
   * All the code that is executed before the scene graph is set
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  async preload(_api: IApi): Promise<void> {
    mustImplementFunction('preload');
  }

  /**
   * All the code that is executed after the scene graph is set
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  async load(api: IApi): Promise<void> {
    await hideLoadingBar();

    const APP = document.querySelector('#app');
    const wrapper = createEmptyWrapper();
    APP?.appendChild(wrapper);

    this.CARDS[api.currentModelId].setup(api);
    Object.keys(api.component_load_map).forEach((key) => {
      const component = api.component_load_map[key];
      component.load(api);
      component.render(api);
      component.languageUpdate(api);
    });

    // if (api.configuration_components.length > 0) {
    //   api.configuration_components.forEach((cmp) => {
    //     cmp.enable();
    //     cmp.updateLanguage();
    //     developmentLog(`Component ${cmp.getComponentName()} loaded`);
    //   });
    // }
  }

  /**
   * This method is celled when Sketchfab viewer is stopped
   */
  viewerStopFunction(): void {
    mustImplementFunction('viewerStopFunction');
  }

  /**
   * @deprecated
   * This method is used used for defining configurator components
   * Inside this function you append components to the COMPONENTS list
   * @param {Sketchfab API object} api - JSON object holding all application data
   */
  loadComponents(_api: IApi): void {}

  /**
   * @deprecated
   * This function pushes a new component class to the component array of the application class
   * @param {Component} componentRef
   */
  addConfiguratorComponent(_componentRef: IComponent): void {
    // if (this.API.configuration_components === undefined) {
    //   this.API.configuration_components = [];
    // }
    // this.API.configuration_components.push(componentRef);
    errorLog('This function is depricated');
  }

  /**
   * This function is extecuted once on page load and it loads all assets and indexes them
   * Pictures, gifs, etc.
   */
  // TODO: make asset loading based only on model type ex.: always load colors, tapestry, but extra elements are loaded only for the selected model
  async loadAssets(context: unknown): Promise<void> {
    const assets = this.importAssets(context);
    const lang = getLangFromURL();

    await loadNewTransllationFiles(assets.lang, this.API);

    this.API.translator = Translator(this.API, lang);
    this.API.image_dictionary = assets.images;
  }

  /**
   * This functions inserts the iframe element to the api-frane-holder div
   * @returns HTML iframe element
   */
  createAPIFrame(): HTMLIFrameElement {
    const PARENT: HTMLDivElement = document.querySelector(
      '#api-frame-holder'
    ) as HTMLDivElement;
    PARENT.innerHTML = `
        <iframe 
            id='api-frame'
            class="w-100 h-100"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
        >
        </iframe>
        `;
    const result = PARENT.children[0] as HTMLIFrameElement;
    return result;
  }

  /**
   * With this function we tell main application renderer what model to load off of sketchab
   * It also preloads all necessary static data such as assets and getter functions
   * @param {String} modelId - reference to the sketchafb model refrence inside api.modelMap
   */
  async loadModel(modelId: string): Promise<void> {
    const loadingBar = document.getElementById('loading-bar');

    const modelReference = this.API.model_map[modelId];

    if (loadingBar === null) {
      errorLog('No valid loading bar element');
      return;
    }

    developmentLog(`Loading model with ID: ${modelId}`);

    this.API_FRAME.style.opacity = '0';

    developmentLog('Started CLIENT initialization');
    this.CLIENT = this.initClient();
    this.CLIENT.init(modelReference, {
      api_log: 0,
      annotation: 0,
      preload: 1,
      ui_infos: 0,
      ui_controls: 0,
      ui_stop: 0,
      ui_color: '00a8c0',
      ui_loading: 0,
      transparent: 1,
      fpspeed: 60,
      autospin: 0,
      ui_annotations: 0,
      ui_help: 0,
      ui_hint: 1,
      dof_circle: 0,
      camera: this.isMobile ? 0 : 1,
      ui_watermark_link: 0,
      ui_watermark: 0,
      ui_vr: 0,
      ui_ar: 0,
      merge_materials: 1,
      success: (api: IApi) => {
        developmentLog('Client initialization successful');

        developmentLog('Setting backend url');
        developmentLog('Setting animation speed');
        api.animation_speed = parseInt(process.env.ANIMATION_SPEED ?? '100');

        developmentLog('Building api object');
        api = {
          ...this.API,
          ...api,
        };

        const wrapper = createEmptyWrapper();

        if (this.isMobile) {
          log('Modile mode');
        } else if (wrapper !== null) {
          console.log('wrapper opaque call maybe remove');
        }

        api.addEventListener('viewerstart', () => {
          developmentLog('viewerstart');
        });

        api.addEventListener('viewerstop', () => {
          developmentLog('viewerstop');
        });

        api.start(() => {
          developmentLog('API started');

          const _loadingprogress = loadingBar.querySelector(
            '#loading-bar-progress'
          );
          _loadingprogress?.setAttribute('animation', 'start');

          api.addEventListener('viewerready', async () => {
            developmentLog('Viewer ready');

            _loadingprogress?.setAttribute('animation', 'end');

            developmentLog('Preload');
            await this.preload(api);
            // TODO: a better way of setting default value of defaultConfig and validation
            // TODO: a better way of setting default value of defaultConfig.extraEqupment and validation
            api.configuration = { extraEquipment: {} };

            this.CARDS[api.currentModelId].setModelConfiguration(api);

            void api.getSceneGraph(async (err: object, graph: object) => {
              if (err !== null) {
                errorLog('An error has occured in the "getSceneGraph" stage');
                console.error(err);
                return;
              }
              developmentLog('Setting the scene graph');
              this.GRAPH = graph;

              // TODO: validation
              developmentLog('Building component dictionary');
              api.model_dictionary = await this.DICTIONARY_BUILDFUNCTION(graph);

              developmentLog('Starting component laoding');
              await this.load(api);
            });
            // this.API_FRAME.style.opacity = '1';
          });
        });
      },
      error: () => {
        alert('Error: Failed to load API. Try reloadig the page');
        errorLog('Error: Failed to load API');
      },
    });
  }

  /**
   * For initializing a new client
   * @returns new sketchfab client instance
   */
  initClient(): any {
    return new window.Sketchfab(this.API_FRAME);
  }

  /**
   * Application name getter
   * @returns String - app name
   */
  getApplicationName(): string {
    return this.appName;
  }

  setModelReference(modelId: string, sketchfabId: string, api: IApi): void {
    if (api.model_map === undefined) {
      api.model_map = {};
    }
    api.model_map[modelId] = sketchfabId;
  }

  /**
   * Stores assets in the application cache
   * @param context
   */
  importAssets(context: any): any {
    const cache: any = {};
    context.keys().forEach((key: string) => {
      const split: string[] = key.split('/');
      const group: string = split[1];
      const name: string = split[2].split('.')[0];

      if (cache[group] === undefined) {
        cache[group] = {};
      }

      cache[group][name] = context(key);
    });
    return cache;
  }
}
