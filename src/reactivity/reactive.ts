import { createHandlers } from "./baseHandlers";
import { activeEffect } from "./effect";
import { CustomObject } from "./shared";

const depsMap = new Map();

export enum Flags {
  ISREACTIVE = "__is_reactive",
  ISREADONLY = "__is_readonly",
}

export function reactive(target: CustomObject) {
  return createReactiveObject(target);
}

export function readonly(target: CustomObject) {
  return createReactiveObject(target, true);
}

function createReactiveObject(target: CustomObject, isReadonly = false) {
  return new Proxy(target, createHandlers(isReadonly));
}

export function isReactive(source: any) {
  return !!source[Flags.ISREACTIVE];
}
export function isReadonly(source: any) {
  return !!source[Flags.ISREADONLY];
}
