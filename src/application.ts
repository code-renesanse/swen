import { buildComponentDictionary } from 'swen-dictionary';
import { createElement } from 'swen-dom';
import { developmentLog, errorLog } from 'swen-logger';
import { API, Dictionary, SketchfabModelElement } from 'swen-types';

export class Application {
  appName: string = '';
  MAIN: HTMLDivElement = createElement('div', '');
  API_FRAME: HTMLIFrameElement = createElement('iframe', '');
  isMobile: boolean = false;
  GRAPH: object = {};
  TRANSLATOR: any = [];
  CARDS: object = {};
  API: API = { imageDictionary: {}, componentDictionary: {}, modelsList: [] };
  BUILD_DICTIONARY_FUNCTION: (graph: object, api) => Promise<Dictionary<SketchfabModelElement>>;

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
    // this.TRANSLATOR;

    this.CARDS = {};
    this.API = {
      currentModelId: '',
      COMPONENTS: [],
      modelsList: [],
      componentDictionary: {},
      ...this.apiGetters()
    };

    /**
         * This setst the default build configuration function the the one that is implemented in the engine
         * @param {Sketchfab GRAPH object} graph
         * @param {Sketchfab API object} api - JSON object holding all application data
         */
    this.DICTIONARY_BUILD_FUNCTION = async (graph, api) => await buildComponentDictionary(graph, api);
  }

  setCurrentModelId (modelId) {
    validateString(modelId);
    this.API.currentModelId = modelId;
  }

  addCard (cardRef) {
    // TODO: cardRef validation
    validateString(cardRef.modelId);
    this.CARDS[cardRef.modelId] = cardRef;
    this.API.modelsList.push(cardRef.modelId);
  }

  /**
     * This is called when the page loads
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  async onPageLoad (api) {
    mustImplementFunction('onPageLoad');
  }

  /**
     * All the code that is executed before the scene graph is set
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  async preload (api) {
    mustImplementFunction('preload');
  }

  /**
     * All the code that is executed after the scene graph is set
     * @param {Sketchfab API object} api - JSON object holding all application data
     * @param {Object} graph - Scene graph object
     */
  async load (api, graph) {
    validateString(api.currentModelId);
    this.CARDS[api.currentModelId].loadDefaultConfiguration(api);
    this.loadComponents(api);

    api.COMPONENTS.length > 0
      ? api.COMPONENTS.forEach(async cmp => {
        cmp.enable();
        cmp.updateLang(api);
        developmentLog(`Component ${cmp.getComponentName()} loaded`);
      })
      : '';

    hideLoadingGif(this.API_FRAME);
  }

  /**
     * This method is celled when Sketchfab viewer is stopped
     */
  viewerStopFunction () {
    mustImplementFunction('viewerStopFunction');
  }

  /**
     * This method is used used for defining configurator components
     * Inside this function you append components to the COMPONENTS list
     * @param {Sketchfab API object} api - JSON object holding all application data
     */
  loadComponents (api) {
    mustImplementFunction('loadComponents function needs to be implemented');
  }

  /**
     * This function pushes a new component class to the component array of the application class
     * @param {Component} componentRef
     */
  addConfiguratorComponent (componentRef) {
    validateConfiguratorComponent(componentRef);
    this.API.COMPONENTS.push(componentRef);
  }

  /**
     * This function is extecuted once on page load and it loads all assets and indexes them
     * Pictures, gifs, etc.
     */
  // TODO: make asset loading based only on model type ex.: always load colors, tapestry, but extra elements are loaded only for the selected model
  async loadAssets () {
    const imageDictionary = buildImageDictionary(require.context(process.env.ASSETS_PATH, true, /\.png|\.gif/));
    this.API = {
      ...this.API,
      imageDictionary
    };

    await loadNewTransllationFiles(this.API);
    const lang = getLangFromURL();
    this.API.TRANSLATOR = await Translator(this.API, lang);
  }

  /**
     * For appending specific functions, usually getter functions, to the API object
     * @returns JSON object this getter functions
     */
  apiGetters () {
    return {};
  }

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
  async loadModel (modelId) {
    developmentLog(`Loading model with ID: ${modelId}`);
    replaceClass(document.getElementById('loading-bar'), 'd-none', 'd-flex');

    const modelReference = getModelReference(modelId, this.API);
    this.API_FRAME.style.opacity = 0;

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
      success: (api) => {
        developmentLog('Client initialization successful');

        developmentLog('Setting backend url');
        developmentLog('Setting animation speed');
        api.animationSpeed = parseInt(process.env.ANIMATION_SPEED);

        developmentLog('Building api object');
        api = {
          ...api,
          ...this.API
        };

        developmentLog('Clearing dock wrapper');
        const wrapper = clearDockWrapper();

        this.isMobile ? log('Modile mode') : '';
        !this.isMobile ? addClass(wrapper, 'opaque') : '';

        api.addEventListener('viewerstart', () => {
          developmentLog('viewerstart');
        });

        api.addEventListener('viewerstop', () => {
          developmentLog('viewerstop');
        });

        api.start(() => {
          developmentLog('API started');
          api.addEventListener('viewerready', async () => {
            developmentLog('Viewer ready');

            developmentLog('Preload');
            await this.preload(api);
            // TODO: a better way of setting default value of defaultConfig and validation
            // TODO: a better way of setting default value of defaultConfig.extraEqupment and validation
            api.defaultConfig = { extraEquipment: {} };
            this.CARDS[api.currentModelId].setModelConfiguration(api);
            api.getSceneGraph(async (err: object, graph: object) => {
              if (err !== null) {
                errorLog('An error has occured in the "getSceneGraph" stage');
                console.error(err);
                return;
              }
              developmentLog('Setting the scene graph');
              this.GRAPH = graph;

              // TODO: validation
              developmentLog('Building component dictionary');
              await this.DICTIONARY_BUILD_FUNCTION(graph, api);

              developmentLog('Starting component laoding');
              await this.load(api, graph);
            });
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
  initClient () { return new Sketchfab(this.API_FRAME); }

  /**
     * Application name getter
     * @returns String - app name
     */
  getApplicationName () {
    return this.appName;
  }
}
