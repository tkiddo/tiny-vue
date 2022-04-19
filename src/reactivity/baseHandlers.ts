import { track, trigger } from "./effect";
import { Flags } from "./reactive";

export function createHandlers(isReadonly = false): ProxyHandler<any> {
  return {
    get(target, key, receiver) {
      if (key === Flags.ISREADONLY && isReadonly) {
        return true;
      }
      if (key === Flags.ISREACTIVE && !isReadonly) {
        return true;
      }
      if (key === Flags.ORIGINAL) {
        return target;
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
