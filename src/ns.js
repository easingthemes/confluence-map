class NameSpace {
  constructor(name) {
    this._center = [0, 0];
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

    if (typeof active === 'boolean') {
      this.updateCenter();
    }
  }

  get center() {
    return this._center;
  }

  updateCenter() {
    const list = Object.values(this.state)
      .map(({ location }) => location.map(l => Number(l)));
    const size = list.length;
    if (size === 1) {
      return list;
    }

    this._center = list.reduce((acc, curr) => {
      return [acc[0] + curr[0]/size, acc[1] + curr[1]/size]
    }, [0, 0]);
  }
}

const NS = new NameSpace('NC_CONFLUENCE_MAP');

export {
  NS
}
