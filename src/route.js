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
    this.removeRoutingControl();
    this.removeMultiRoutingControl();

    this.routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(this.NS.map);
  }

  async addMultiRoutingControl(waypoints, i = 0) {
    if (this.routingControl !== null) {
      this.removeRoutingControl();
    }

    this.multiRoutingControl = this.multiRoutingControl || {};
    const center = await this.getCenter();
    waypoints.forEach((point, i) => {
      this.addMultiRoutingControlPart([center, point], i);
    });
  }

  addMultiRoutingControlPart(waypoints, i = 0) {
    this.multiRoutingControl[i] = L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(this.NS.map);
  }

  removeMultiRoutingControl() {
    if (this.multiRoutingControl !== null) {
      Object.values(this.multiRoutingControl).map(control => {
        this.NS.map.removeControl(control);
      })
      this.multiRoutingControl = null;
    }
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

  async zoomToCenter(map, state) {
    const points = Object.values(state).map(({ location }) => location);
    const bounds = new this.NS.L.LatLngBounds(points);
    await map.fitBounds(bounds);
  }

  async getCenter() {
    await this.zoomToCenter(this.NS.map, this.NS.state);
    return this.NS.map.getCenter();
  }
}
