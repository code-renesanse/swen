import { Message } from './message.model';

export const log = (text: string): void => {
  console.log(`%c${text}`);
};

export const errorLog = (message: Message) => {
  if ((process.env.APP_NAME ?? '').length === 0) {
    throw new Error('No valid APP_NAME enviromantal variable');
  }

  throw new Error(`[ ${process.env.APP_NAME ?? 'error404'} ]: ${message}`);
};

export const developmentLog = (message: Message): Message | void => {
  if ((process.env.APP_NAME ?? '').length === 0) {
    return errorLog('No valid APP_NAME enviromantal variable');
  }

  if ((process.env.NODE_ENV ?? '').length === 0) {
    return errorLog('No valid NODE_ENV enviromantal variable');
  }

  if (process.env.NODE_ENV === 'development') {
    const appname: string =
      process.env.APP_NAME ?? 'error: no APP_NAME env variable';
    console.log(`[ ${appname} ]: ${message}`);
    return `[ ${appname} ]: ${message}`;
  }

  return '';
};

export const mustImplementFunction = (functionName: Message): void => {
  errorLog(
    `Function ${
      functionName !== '' ? `"${functionName}"` : ''
    } needs to be implemented`
  );
};

export * from './message.model';
