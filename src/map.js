import { config } from './config.js';
import { NS } from './ns.js';

export class LeafletMap {
  constructor($map) {
    return this.init($map);
  }

  init($map) {
    const map = this.initMap($map, NS.config.initialCenter, NS.config.defaultZoom);
    this.addTiles(map);
    this.addMarkers(map, NS.state);

    return map;
  }

  initMap($el, center, zoom) {
    return new NS.L.map($el, {
      center,
      zoom
    });
  }

  addTiles(map) {
    NS.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  addMarkers(map, state) {
    NS.L.Icon.Default.imagePath = `${config.LEAFLET.PATH}/images/`;
    Object.values(state).forEach(({ location, label }) => {
      const marker = NS.L.marker(location);
      marker.bindPopup(label).openPopup();
      marker.addTo(map);
    })
  }
}
