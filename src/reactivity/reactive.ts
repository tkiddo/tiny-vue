export function reactive(target: any) {
  return createReactiveObject(target);
}

function createReactiveObject(target: any) {
  return new Proxy(target, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      return true;
    },
  });
}
