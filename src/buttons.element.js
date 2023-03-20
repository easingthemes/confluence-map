import { RouteController } from './route.js';
import { renderStyle } from './style.js';
import { config } from './config.js';
import { NS } from './ns.js';

export class RouteButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.RouteController = new RouteController();
  }

  get points() {
    return Object.values(NS.state)
      .filter(item => item.active)
      .map(item => item?.location);
  }

  async connectedCallback() {
    await this.mount();
  }

  async mount() {
    renderStyle(this.shadowRoot, `
    <style>
    .nc__button {
      margin: 10px 0;
      background: #3572B0;
      color: #fff;
      padding: 10px 15px;
      border: 0;
      border-radius: 3px;
      font-weight: bold;
      cursor: pointer;
    }
    .button__clear {
        margin-left: 10px;
        opacity: 0.7
    }
    </style>
    `);
    this.shadowRoot.appendChild(this.renderButton('calculate'));
    this.shadowRoot.appendChild(this.renderButton('clear'));
    this.shadowRoot.appendChild(this.renderButton('center'));
  }

  renderButton(type) {
    const $button = document.createElement('button');
    $button.innerText = config.labels[`${type.toUpperCase()}_ROUTE`];
    $button.classList.add('nc__button', `button__${type}`);
    $button.addEventListener('click', (e) => {
      this.routeActions[type]();
    });
    return $button;
  }

  get routeActions() {
    return {
      calculate: () => this.RouteController.calculateRoute(this.points),
      clear: () => this.RouteController.removeRoutingControl(),
      center: () => this.RouteController.calculateMultiRoutes(this.points)
    }
  }
}
