import { createElement, getDomFromReference, hideLoading, showLoading } from '../dom';
import { developmentLog } from '../logger';
import { _Application_ } from './application/application';

export class Launcher {
  async setupApplication (context: any, application: _Application_): Promise<void> {
    showLoading();
    developmentLog(`Running in ${this.getEnviromentLevel()} mode`);
    await application.loadAssets(context);
    developmentLog('Assets have loaded');
    await application.onPageLoad(application.API);
    hideLoading(application.API_FRAME);
    developmentLog('Page has loaded');
  }

  async setupLauncher (): Promise<void> {
    const APP = getDomFromReference('app');

    const _modelSelectionHolder = createElement('div', 'model-selection-holder');
    const _apiFrameHolder = createElement('div', 'api-frame-holder');
    const _wrapper = createElement('div', 'wrapper');
    const _wrapperContainer = createElement('div', 'wrapper-container');
    const _dockWrapper = createElement('div', 'dock-wrapper');
    const _langButtonHolder = createElement('div', 'lang-btn-holder');

    APP.appendChild(_modelSelectionHolder);
    APP.appendChild(_apiFrameHolder);

    _wrapperContainer.appendChild(_dockWrapper);
    _wrapperContainer.appendChild(_langButtonHolder);

    _wrapper.appendChild(_wrapperContainer);
    APP.appendChild(_wrapper);
  }

  getEnviromentLevel (): string {
    return process.env.NODE_ENV?.toLocaleUpperCase() ?? 'error404';
  }
}
