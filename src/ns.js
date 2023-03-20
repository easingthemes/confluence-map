export class NameSpace {
  constructor(name) {
    this.name = name;
    this._state = {};
    this.__bindNamespace();
  }

  __bindNamespace() {
    window[this.name] = this.public();
  }

  get state() {
    return this._state;
  }

  __updateState(key, data, field) {
    if (field) {
      this._state[key][field] = data;
    } else {
      this._state[key] = data;
    }
  }

  public() {
    return {
      get state() {
        return this._state;
      },
      updateState(...params) {
        return this.__updateState(...params)
      }
    }
  }
}
