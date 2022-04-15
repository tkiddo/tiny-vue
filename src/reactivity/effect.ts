export let activeEffect: any;
export function effect(fn: Function) {
  activeEffect = fn;
  fn();
}
