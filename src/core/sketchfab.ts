
import { Sketchfab } from '@sketchfab/viewer-api';

export const createConnection = (API_FRAME: HTMLDivElement): Function => new Sketchfab(API_FRAME);
