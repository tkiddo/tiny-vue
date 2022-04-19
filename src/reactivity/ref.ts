import { track, trigger } from "./effect";

class RefImpl {
  private _value;
  private _isRef = true;
  constructor(initialValue: any) {
    this._value = initialValue;
  }
  get value() {
    track(this, "value");
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    trigger(this, "value");
  }
}

export function ref(source: any) {
  return new RefImpl(source);
}

export function isRef(r: any): r is RefImpl {
  return r ? r._isRef === true : false;
}
