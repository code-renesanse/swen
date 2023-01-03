import { Component } from './component';

export class ComponentSchema {
  COMPONENT_NAME: string;

  PARENT_SELECTION_KEY: string;

  CHILD_SELECTION_KEY: string;

  constructor(component: Component) {
    this.COMPONENT_NAME = component.getComponentName();
    this.PARENT_SELECTION_KEY = component.getSelectionKey();
    this.CHILD_SELECTION_KEY = `${component.getComponentName()}-child`;
  }

  setChildSelectionKey(newKey: string) {
    this.CHILD_SELECTION_KEY = newKey;
    return newKey;
  }
}
