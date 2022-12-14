import { Message } from './message.model';

export const log = (text: string): void => {
  console.log(`%c${text}`);
};

export const developmentLog = (message: Message): Message => {
  if ((process.env.APP_NAME ?? '').length === 0) {
    errorLog('No valid APP_NAME enviromantal variable');
    return 'No valid APP_NAME enviromantal variable';
  }

  if ((process.env.NODE_ENV ?? '').length === 0) {
    errorLog('No valid NODE_ENV enviromantal variable');
    return 'No valid NODE_ENV enviromantal variable';
  }

  if (process.env.NODE_ENV === 'development') {
    const appname: string = process.env.APP_NAME ?? 'error: no APP_NAME env variable';
    console.log(`[ ${appname} ]: ${message}`);
    return `[ ${appname} ]: ${message}`;
  }

  return '';
};

export const errorLog = (message: Message): void => {
  if ((process.env.APP_NAME ?? '').length === 0) {
    console.log('No valid APP_NAME enviromantal variable');
    return;
  }

  // const isNode = (): boolean => { try { return this === global; } catch (e) { return false; } };

  // console.error(`[ ${process.env.APP_NAME ?? 'no APP_NAME env variable'} ]: ${message}`);

  // if (!isNode()) {
  //   alert(`[ ${process.env.APP_NAME ?? 'no APP_NAME env variable'} ]: ${message}`);
  // }

  throw new Error(`[ ${process.env.APP_NAME ?? 'no APP_NAME env variable'} ]: ${message}`);
};

export const mustImplementFunction = (functionName: Message): void => {
  errorLog(`Function ${functionName !== '' ? `"${functionName}"` : ''} needs to be implemented`);
};

export * from './message.model';
