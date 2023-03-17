import { ConfigTable } from './table.js';
import { RouteButtons } from './buttons.element.js';
import { MapElement } from './map.element.js';

(() => {
  const configTable = new ConfigTable();
  configTable.init();
  customElements.define('nc-map', MapElement);
  customElements.define('nc-buttons', RouteButtons);
})()
