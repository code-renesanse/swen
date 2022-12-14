import { createElement, hideLoadingBar } from '../../dom';
import { buildComponentDictionary } from '../../dictionary';
import { developmentLog, errorLog, log, mustImplementFunction } from '../../logger';
import { IApi, Dictionary, ISketchfabModelElement } from '../../types';
import { IModels } from '../card/card.model';
import { getLangFromURL, loadNewTransllationFiles, Translator } from '../../languages';
import { clearDockWrapper } from '../../dock/functions';
import { _Card_ } from '../card';
import { IComponent } from '../component';
import { createEmptyWrapper } from '../../dom/wrapper';

declare const window: any;

export class _Application_ {
  appName: string = '';
  MAIN: HTMLDivElement = createElement('div', '');
  API_FRAME: HTMLIFrameElement = createElement('iframe', '');
  isMobile: boolean = false;
  GRAPH: object = {};
  translator: any = [];
  CARDS: IModels = {};
  API: IApi = {
    configuration: {},
    image_dictionary: {},
    model_dictionary: {},
    model_map: {},
    currentModelId: '',
    animation_speed: 0,
    languages: {},
    translator: {},
    configuration_components: [],
    component_load_map: {},
    is_mobile: false,
    // getters: {},
    show: function (_id: string): void {
      throw new Error('Function show is not implemented.');
    },
    hide: function (_id: string): void {
      throw new Error('Function is not implemented.');
    },
    start: function (_fun: () => void): void {
      throw new Error('Function not implemented.');
    },
    getSceneGraph: function (_fun: (err: object, graph: object) => void): void {
      throw new Error('Function not implemented.');
    },
    addEventListener: function (_type: string, _fun: () => void | Promise<void>): void {
      throw new Error('Function not implemented.');
    }
  };

  DICTIONARY_BUILD_FUNCTION!: (graph: object) => Promise<Dictionary<ISketchfabModelElement>>;
  CLIENT: any;

  constructor (appName: string) {
    // validateEnvironmentalVariables();
    if (process.env.APP_NAME === null || process.env.APP_NAME === undefined || process.env.APP_NAME === '') {
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
    this.API = {
      configuration: {},
      currentModelId: '',
      image_dictionary: {},
      model_dictionary: {},
      animation_speed: 0,
      languages: {},
      translator: {},
      configuration_components: [],
      model_map: {},
      component_load_map: {},
      is_mobile: false,
      // getters: this.apiGetters(),
      show () {},
      hide () {},
      start () {},
      addEventListener () {},
      getSceneGraph () {}
    };

    /**
         * This setst the default build configuration function the the one that is implemented in the engine
         * @param {Sketchfab GRAPH object} graph
         */
    this.DICTIONARY_BUILD_FUNCTION = async (graph) => await buildComponentDictionary(graph);
  }

  setCurrentModelId (modelId: string): void {
    // validateString(modelId);
    this.API.currentModelId = modelId;
  }

  // TODO: implement model CARDS
  addCard (cardRef: _Card_): void {
    // TODO: cardRef validation
    // validateString(cardRef.modelId);
    this.CARDS[cardRef.modelid] = cardRef;
  }

  /**
     * This is called when the page loads
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  async onPageLoad (_api: IApi): Promise<void> {
    mustImplementFunction('onPageLoad');
  }

  /**
     * All the code that is executed before the scene graph is set
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  async preload (_api: IApi): Promise<void> {
    mustImplementFunction('preload');
  }

  /**
     * All the code that is executed after the scene graph is set
     * @param {Sketchfab API object} api - JSON object holding all application data
   */
  async load (api: IApi): Promise<void> {
    await hideLoadingBar();

    // Creates the wrapper
    const APP = document.querySelector('#app');
    const _wrapper = createEmptyWrapper();
    APP?.appendChild(_wrapper);

    this.CARDS[api.currentModelId].loadDefaultConfiguration(api);
    this.loadComponents(api);

    if (api.configuration_components.length > 0) {
      api.configuration_components.forEach((cmp) => {
        cmp.enable();
        cmp.updateLang(api);
        developmentLog(`Component ${cmp.getComponentName()} loaded`);
      });
    }
  }

  /**
     * This method is celled when Sketchfab viewer is stopped
     */
  viewerStopFunction (): void {
    mustImplementFunction('viewerStopFunction');
  }

  /**
     * This method is used used for defining configurator components
     * Inside this function you append components to the COMPONENTS list
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  loadComponents (_api: IApi): void {
    mustImplementFunction('loadComponents function needs to be implemented');
  }

  /**
     * This function pushes a new component class to the component array of the application class
     * @param {Component} componentRef
     */
  addConfiguratorComponent (componentRef: IComponent): void {
    // validateConfiguratorComponent(componentRef);
    this.API.configuration_components.push(componentRef);
  }

  /**
     * This function is extecuted once on page load and it loads all assets and indexes them
     * Pictures, gifs, etc.
     */
  // TODO: make asset loading based only on model type ex.: always load colors, tapestry, but extra elements are loaded only for the selected model
  async loadAssets (context: any): Promise<void> {
    const assets = this.importAssets(context);
    const lang = getLangFromURL();

    await loadNewTransllationFiles(assets.lang, this.API);

    this.API.translator = Translator(this.API, lang);
    this.API.image_dictionary = assets.images;
  }

  // DEPRICATED
  // /**
  //    * For appending specific functions, usually getter functions, to the API object
  //    * @returns JSON object this getter functions
  //    */
  // apiGetters () {
  //   return {};
  // }

  /**
     * This functions inserts the iframe element to the api-frane-holder div
     * @returns HTML iframe element
     */
  createAPIFrame (): HTMLIFrameElement {
    const PARENT: HTMLDivElement = document.querySelector('#api-frame-holder') as HTMLDivElement;
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
  async loadModel (modelId: string, api: IApi): Promise<void> {
    const loadingBar = document.getElementById('loading-bar');

    const modelReference = api.model_map[modelId];

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
          ...api
        };

        developmentLog('Clearing dock wrapper');
        const wrapper = clearDockWrapper();

        if (this.isMobile) {
          log('Modile mode');
        } else {
          if (wrapper !== null) {
            console.log('wrapper opaque call maybe remove');
          }
        }

        api.addEventListener('viewerstart', () => {
          developmentLog('viewerstart');
        });

        api.addEventListener('viewerstop', () => {
          developmentLog('viewerstop');
        });

        api.start(() => {
          developmentLog('API started');

          const _loadingprogress = loadingBar.querySelector('#loading-bar-progress');
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
              api.model_dictionary = await this.DICTIONARY_BUILD_FUNCTION(graph);

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
      }
    });
  }

  /**
     * For initializing a new client
     * @returns new sketchfab client instance
     */
  initClient (): any { return new window.Sketchfab(this.API_FRAME); }

  /**
     * Application name getter
     * @returns String - app name
     */
  getApplicationName (): string {
    return this.appName;
  }

  setModelReference (modelId: string, sketchfabId: string, api: IApi): void {
    api.model_map[modelId] = sketchfabId;
  }

  /**
   * Stores assets in the application cache
   * @param context
   */
  importAssets (context: any): any {
    const cache: any = {};
    context.keys().forEach((key: string) => {
      const split: string[] = key.split('/');
      const group: string = split[1];
      const name: string = split[2].split('.')[0];

      if (cache[group] === undefined) {
        cache[group] = {};
      }

      (cache[group][name] = context(key));
    });
    return cache;
  }
}
