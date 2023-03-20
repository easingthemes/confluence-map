import { NS } from './ns.js';

export class RouteController {
  constructor() {
    this.routingControl = null;
    this.NS = NS;
  }
  addRoutingControl(waypoints) {
    this.removeRoutingControl();
    this.removeMultiRoutingControl();

    this.routingControl = NS.L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(NS.map);
  }

  async addMultiRoutingControl(waypoints) {
    if (this.routingControl !== null) {
      this.removeRoutingControl();
    }

    this.multiRoutingControl = this.multiRoutingControl || {};
    const center = await this.getCenter();
    console.log({ center, waypoints });
    waypoints.forEach((point, i) => {
      this.addMultiRoutingControlPart([center, point], i);
    });
  }

  addMultiRoutingControlPart(waypoints, i = 0) {
    this.multiRoutingControl[i] = NS.L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(NS.map);
  }

  removeMultiRoutingControl() {
    if (this.multiRoutingControl) {
      Object.values(this.multiRoutingControl).map(control => {
        NS.map.removeControl(control);
      })
      this.multiRoutingControl = null;
    }
  }

  removeRoutingControl() {
    if (this.routingControl) {
      NS.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    this.removeMultiRoutingControl();
  }

  getWaypoints(points = []) {
    return points.map(coord => {
      return NS.L.latLng(coord[0], coord[1])
    });
  }

  async calculateRoute(points = []) {
    const waypoints = this.getWaypoints(points);

    if (waypoints.length === 0) {
      return;
    }

    this.addRoutingControl(waypoints);
  }

  async calculateMultiRoutes(points = []) {
    const waypoints = this.getWaypoints(points);
    await this.addMultiRoutingControl(waypoints);
  }

  __sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async zoomToCenter() {
    const points = Object.values(NS.state).map(({ location }) => location);
    await NS.map.fitBounds(points);
    return this.__sleep(300);
  }

  async getCenter() {
    await this.zoomToCenter();
    return NS.map.getCenter();
  }
}
