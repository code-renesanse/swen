import { createElement, getDomFromReference } from '../dom';
import { hideLoading, showLoading } from '../dom/loading/loading';
import { developmentLog } from '../logger';
import { Application } from './application/application';

export class Launcher {
  async setupApplication(
    context: unknown,
    application: Application
  ): Promise<void> {
    showLoading();
    developmentLog(`Running in ${this.getEnviromentLevel()} mode`);
    await application.loadAssets(context);
    developmentLog('Assets have loaded');
    await application.onPageLoad(application.API);
    hideLoading();
    developmentLog('Page has loaded');
  }

  async setupLauncher(): Promise<void> {
    const APP = getDomFromReference('app');

    const modelSelectionHolder = createElement('ul', 'model-selection-holder');
    const apiFrameHolder = createElement('div', 'api-frame-holder');

    APP.appendChild(modelSelectionHolder);
    APP.appendChild(apiFrameHolder);
  }

  getEnviromentLevel(): string {
    return process.env.NODE_ENV?.toLocaleUpperCase() ?? 'error404';
  }
}
