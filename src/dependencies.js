import { config } from './config.js';

export class Dependencies {
  constructor(shadowRoot) {
    this.shadowRoot = shadowRoot;
  }

  load() {
    this.renderStyle(`${config.LEAFLET.PATH}/${config.LEAFLET.CSS}`);
    this.renderStyle(`${config.ROUTE.PATH}/${config.ROUTE.CSS}`);
    const scripts = this.renderScripts([
      `${config.LEAFLET.PATH}/${config.LEAFLET.JS}`,
      `${config.ROUTE.PATH}/${config.ROUTE.JS}`
    ]);

    return Promise.all(scripts);
  }

  renderScripts(srcs) {
    return srcs.map(src => {
      return this.renderScript(src);
    });
  }

  renderScript(src) {
    return new Promise((resolve, reject) => {
      const $script = document.createElement('script');
      $script.src = src;
      $script.onload = () => {
        resolve();
      }
      $script.onerror = () => {
        reject();
      }
      this.shadowRoot.appendChild($script);
    });
  }

  renderStyle(href) {
    const $link = document.createElement('link');
    $link.setAttribute('rel', 'stylesheet');
    $link.href = href;
    this.shadowRoot.appendChild($link);
  }
}
