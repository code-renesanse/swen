import { createElement, getDomFromReference, hideLoadingSvg, showLoadingSvg } from '../dom';
import { developmentLog } from '../logger';
import { _Application_ } from './application/application';

export class Launcher {
  async setupApplication (context: any, application: _Application_): Promise<void> {
    showLoadingSvg();
    developmentLog(`Running in ${this.getEnviromentLevel()} mode`);
    await application.loadAssets(context);
    developmentLog('Assets have loaded');
    await application.onPageLoad(application.API);
    hideLoadingSvg();
    developmentLog('Page has loaded');
  }

  async setupLauncher (): Promise<void> {
    const APP = getDomFromReference('app');

    const _modelSelectionHolder = createElement('ul', 'model-selection-holder');
    const _apiFrameHolder = createElement('div', 'api-frame-holder');

    APP.appendChild(_modelSelectionHolder);
    APP.appendChild(_apiFrameHolder);
  }

  getEnviromentLevel (): string {
    return process.env.NODE_ENV?.toLocaleUpperCase() ?? 'error404';
  }
}
