import { getTranslation } from '../../../languages';
import { IApi } from '../../../types';

// TODO: make generic meaning that name splitting is not hardcoded
/**
 *
 * @param {DOMObject} parameter - reference to thee DOM object
 * @returns String - content of the paragraph
 */
export const getListItemParagraphContent = (api: IApi, { name }: { name: string }): string => getTranslation(api, name.split('CX-')[1]);
