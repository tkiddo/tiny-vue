import { track, trigger } from "./effect";
import { Flags, reactive } from "./reactive";
import { isObject } from "./shared/utils";

export function createHandlers(
  isReadonly = false,
  isShallow = false
): ProxyHandler<any> {
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

      const res = Reflect.get(target, key, receiver);

      if (isObject(res) && !isShallow) {
        return reactive(res);
      }
      return res;
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
