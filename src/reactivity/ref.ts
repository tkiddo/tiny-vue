import { track, trigger } from "./effect";

class RefImpl {
  private _value;
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
