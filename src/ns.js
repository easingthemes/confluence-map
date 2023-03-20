class NameSpace {
  constructor(name) {
    this._state = {};
    this._config = {};
    window[name] = window[name] || this;
    return window[name];
  }

  get config() {
    return this._config;
  }
  set config(conf) {
    this._config = conf;
  }
  get state() {
    return this._state;
  }
  set state({ id, label, location, active }) {
    this._state[id] = this._state[id] || {};
    this._state[id] = {
      ...this._state[id],
      ...label && { label },
      ...location && { location },
      ...(typeof active === 'boolean') && { active }
    };
  }
}

const NS = new NameSpace('NC_CONFLUENCE_MAP');

export {
  NS
}
