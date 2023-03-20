import { config } from './config.js';

export class LeafletMap {
  constructor($map, NS) {
    this.NS = NS;
    this.init($map);
  }

  init($map) {
    this.NS.map = this.initMap($map, this.NS.config.initialCenter, this.NS.config.defaultZoom);
    this.addTiles(this.NS.map);
    this.addMarkers(this.NS.map, this.NS.state);
  }

  initMap($el, center, zoom) {
    return new this.NS.L.map($el, {
      center,
      zoom
    });
  }

  addTiles(map) {
    this.NS.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  addMarkers(map, state) {
    this.NS.L.Icon.Default.imagePath = `${config.LEAFLET.PATH}/images/`;
    Object.values(state).forEach(({ location, label }) => {
      const marker = this.NS.L.marker(location);
      marker.bindPopup(label).openPopup();
      marker.addTo(map);
    })
  }
}
