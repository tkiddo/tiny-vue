import { createHandlers } from './baseHandlers';
import { CustomObject } from './shared';

export enum Flags {
  ISREACTIVE = '__is_reactive',
  ISREADONLY = '__is_readonly',
  ORIGINAL = '__original'
}

export function reactive(target: CustomObject) {
  return createReactiveObject(target);
}

export function shallowReactive(target: CustomObject) {
  return createReactiveObject(target, false, true);
}

export function readonly(target: CustomObject) {
  return createReactiveObject(target, true);
}

export function shallowReadonly(target: CustomObject) {
  return createReactiveObject(target, true, true);
}

function createReactiveObject(target: CustomObject, isReadonly = false, isShallow = false) {
  return new Proxy(target, createHandlers(isReadonly, isShallow));
}

export function isReactive(source: any) {
  return !!source[Flags.ISREACTIVE];
}
export function isReadonly(source: any) {
  return !!source[Flags.ISREADONLY];
}

export function toRaw(observed: any) {
  return isReadonly(observed) || isReactive(observed) ? observed[Flags.ORIGINAL] : observed;
}
