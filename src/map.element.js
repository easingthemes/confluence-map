import { LeafletMap } from './map.js';
import { Dependencies } from './dependencies.js';
import { renderStyle } from './style.js';

export class MapElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.leafletMap = new LeafletMap();
  }

  async connectedCallback() {
    await this.mount();
  }

  async mount() {
    renderStyle(this.shadowRoot, `
    <style>
    .map-wrapper {
        overflow: hidden;
        padding: 0 10px;
        max-width: 100%;
    }
    #map {
        height: 600px;
        width: 100%;
    }
    .leaflet-container {
        height: 600px;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    }
    </style>
    `);
    this.shadowRoot.appendChild(this.renderElements());
    const $map = this.shadowRoot.querySelector('#map');
    const dependencies = new Dependencies(this.shadowRoot);
    dependencies.load().then((data) => {
      this.leafletMap.init($map);
    });
  }

  renderElements() {
    const $map = document.createElement('div');
    $map.id = 'map';
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('map-wrapper');
    $wrapper.appendChild($map);

    return $wrapper;
  }
}
