import { CustomObject } from './shared';

export let activeEffect: Effect;
class Effect {
  private _fn;
  constructor(fn: Function) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
  }
}
export function effect(fn: Function) {
  const effectInstance = new Effect(fn);
  effectInstance.run();
  return effectInstance;
}

const depsMap = new Map();
export function track(target: CustomObject, key: string) {
  let targetMap = depsMap.get(target);
  if (!targetMap) {
    targetMap = new Map();
    depsMap.set(target, targetMap);
  }
  let dep = targetMap.get(key);
  if (!dep) {
    dep = new Set();
    targetMap.set(key, dep);
  }
  dep.add(activeEffect);
}

export function trigger(target: CustomObject, key: string) {
  const targetMap = depsMap.get(target);
  const dep = targetMap.get(key);
  dep.forEach((effect: Effect) => {
    if (effect) {
      effect.run();
    }
  });
}
