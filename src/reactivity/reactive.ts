import { activeEffect } from "./effect";

const dep = new Set();

export function reactive(target: any) {
  return createReactiveObject(target);
}

function createReactiveObject(target: any) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger();
      return true;
    },
  });
}
function track() {
  dep.add(activeEffect);
}

function trigger() {
  dep.forEach((fn) => {
    typeof fn === "function" && fn();
  });
}
