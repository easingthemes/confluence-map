class NameSpace {
  constructor(name) {
    this._state = {};
    this._config = {};
    const NS = window[name] || this.public();
    window[name] = NS;
    return NS;
  }

  public() {
    return {
      get config() {
        return this._config;
      },
      set config(conf) {
        this._config = conf;
      },
      get state() {
        return this._state;
      },
      set state({ id, data, field }) {
        if (field) {
          this._state[id][field] = data;
        } else {
          this._state[id] = data;
        }
      }
    }
  }
}

const NS = new NameSpace('NC_CONFLUENCE_MAP');

export {
  NS
}
