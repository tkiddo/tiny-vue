type res = 1 extends 2 ? true : false;

type isTwo<T> = T extends 2 ? true : false;

type a = isTwo<1>;
type b = isTwo<2>;

type c = { a: string };
type d = { b: string };
type res2 = c extends d ? true : false;

type first<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;

type res3 = first<[1, 2, 3]>;

type ua = number | string;
const uav: ua = 1;

type omap<T> = { [K in keyof T as `pre-${K & string}`]: T[K][] };

type oa = omap<{ a: string; b: number }>;

type getValue<T> = T extends Promise<infer R> ? R : never;
type res4 = getValue<Promise<string>>;

type getFirst<T extends unknown[]> = T extends [infer First, ...unknown[]]
  ? First
  : never;
type res5 = getFirst<[string, number, string]>;

type getPopArr<T extends unknown[]> = T extends [...infer Rest, unknown]
  ? Rest
  : never;
type res6 = getPopArr<[string, number, string]>;

type startWith<
  target extends string,
  prefix extends string
> = target extends `${prefix}${string}` ? true : false;
type res7 = startWith<"abc", "ab">;

type getArgs<Fn extends Function> = Fn extends (...args: infer Args) => unknown
  ? Args
  : never;
type res8 = getArgs<(a: string, b: number) => void>;

let abc: unknown = 1;
abc = 3;

type getReturn<Fn extends Function> = Fn extends (
  ...args: any[]
) => infer Return
  ? Return
  : never;
type res9 = getReturn<(a: string, b: number) => number>;

type one = [1, 2, 3];
type two = ["d", "s", "e"];

type combine<Arr1 extends unknown[], Arr2 extends unknown[]> = Arr1 extends [
  infer First1,
  ...infer Rest1
]
  ? Arr2 extends [infer First2, ...infer Rest2]
    ? [[First1, First2], ...combine<Rest1, Rest2>]
    : []
  : [];

type result = combine<one, two>;

type capitalize<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : never;
type result2 = capitalize<"hfdadfas">;

type camelize<Str extends string> =
  Str extends `${infer Left}_${infer First}${infer Rest}`
    ? `${Left}${Uppercase<First>}${camelize<Rest>}`
    : Str;

type result3 = camelize<"hell_ds_dfad_sds">;

type uppercaseKey<obj extends object> = {
  [Key in keyof obj as `${capitalize<Key & string>}`]: obj[Key];
};

type upObj = uppercaseKey<{
  name: string;
}>;

type reverse<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest]
  ? [...reverse<Rest>, First]
  : Arr;

type abs = reverse<[1, 2, 3, 4]>;
