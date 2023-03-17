export class RouteController {
  constructor() {
    this.routingControl = null;
    this.NS = this.bindNamespace();
  }

  bindNamespace() {
    window.NC_CONFLUENCE_MAP = window.NC_CONFLUENCE_MAP || {};
    return window.NC_CONFLUENCE_MAP;
  }
  addRoutingControl(waypoints) {
    if (this.routingControl !== null) {
      this.removeRoutingControl();
    }

    this.routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(this.NS.map);
  }

  removeRoutingControl() {
    if (this.routingControl !== null) {
      this.NS.map.removeControl(this.routingControl);
      this.routingControl = null;
    }
  }

  async calculateRoute(points = []) {
    const waypoints = points.map(coord => {
      return L.latLng(coord[0], coord[1])
    });

    if (waypoints.length === 0) {
      return;
    }

    this.addRoutingControl(waypoints);
  }
}
