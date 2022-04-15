import { activeEffect } from "./effect";

const depsMap = new Map();

export function reactive(target: any) {
  return createReactiveObject(target);
}

function createReactiveObject(target: any) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return true;
    },
  });
}
function track(target, key) {
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

function trigger(target, key) {
  const targetMap = depsMap.get(target);
  const dep = targetMap.get(key);
  dep.forEach((fn) => {
    typeof fn === "function" && fn();
  });
}
