import { hideLoading, showLoading } from '../dom';
import { developmentLog } from '../logger';
import { _Application_ } from './application/application';

export class Launcher {
  application: _Application_ | null = null;
  constructor (context: any, application: _Application_) {
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
