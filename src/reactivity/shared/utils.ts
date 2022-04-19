export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === "object";
}
