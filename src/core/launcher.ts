import { hideLoading, showLoading } from '../dom';
import { developmentLog } from '../logger';
import { Application } from './application';

export class Launcher {
  application: Application | null = null;
  constructor (context: any, application: Application) {
    void (async () => {
      this.application = application;
      showLoading();
      developmentLog(`Running in ${this.getEnviromentLevel()} mode`);
      await this.application.loadAssets(context);
      developmentLog('Assets have loaded');
      await this.application.onPageLoad(this.application.API);
      hideLoading(application.API_FRAME);
      developmentLog('Page has loaded');
    })();
  }

  getEnviromentLevel (): string {
    return process.env.NODE_ENV?.toLocaleUpperCase() ?? 'error404';
  }
}
