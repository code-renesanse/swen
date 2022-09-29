/**
 *
 * @param {DOMElement} dockItem
 * @returns string id of the dock element
 */
export const getIdFromDockItem = (dockItem: HTMLElement): number => parseInt(dockItem.id.split('-')[2]);
