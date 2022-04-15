import { activeEffect } from "./effect";
import { Flags } from "./reactive";
import { CustomObject } from "./shared";

export function createHandlers(isReadonly = false) {
  return {
    get(target, key, receiver) {
      if (key === Flags.ISREADONLY && isReadonly) {
        return true;
      }
      if (key === Flags.ISREACTIVE && !isReadonly) {
        return true;
      }
      track(target, key as string);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (!isReadonly) {
        Reflect.set(target, key, value, receiver);
        trigger(target, key as string);
        return true;
      } else {
        throw "target is readonly";
      }
    },
  };
}

const depsMap = new Map();
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
