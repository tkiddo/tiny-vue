import { activeEffect } from "./effect";

const depsMap = new Map();

const ISREACTIVE = "__is_reactive";

type CustomObject = Record<string, any>;

export function reactive(target: CustomObject) {
  return createReactiveObject(target);
}

function createReactiveObject(target: CustomObject) {
  return new Proxy(target, {
    get(target, key, receiver) {
      if (key === ISREACTIVE) {
        return true;
      } else {
        track(target, key as string);
        return Reflect.get(target, key, receiver);
      }
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(target, key as string);
      return true;
    },
  });
}

function track(target: CustomObject, key: string) {
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

function trigger(target: CustomObject, key: string) {
  const targetMap = depsMap.get(target);
  const dep = targetMap.get(key);
  dep.forEach((fn: unknown) => {
    typeof fn === "function" && fn();
  });
}

export function isReactive(source: any) {
  return !!source[ISREACTIVE];
}
