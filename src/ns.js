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
  set state({ id, data, field }) {
    this._state[id] = this._state[id] || {}
    if (field) {
      this._state[id][field] = data;
    } else {
      this._state[id] = data;
    }
  }
}

const NS = new NameSpace('NC_CONFLUENCE_MAP');

export {
  NS
}
