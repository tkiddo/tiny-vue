import { effect } from "../effect";
import {
  isReactive,
  isReadonly,
  reactive,
  readonly,
  shallowReactive,
  shallowReadonly,
  toRaw,
} from "../reactive";

test("happy path", () => {
  expect(true).toBe(true);
});

test("reactive function", () => {
  const original = {
    foo: "foo",
  };
  const observed = reactive(original);
  expect(observed).not.toBe(original);
  expect(observed.foo).toBe("foo");
  observed.foo = "bar";
  expect(observed.foo).toBe("bar");
});

test("is reactive", () => {
  const original = {
    name: "hello",
  };
  const foo = reactive(original);
  expect(foo.name).toBe("hello");
  expect(isReactive(foo)).toBe(true);
  expect(isReactive(original)).toBe(false);
});

test("readonly", () => {
  const original = {
    name: "hello",
  };
  const observed = readonly(original);
  expect(observed.name).toBe("hello");
  expect(isReadonly(observed)).toBe(true);
  expect(isReactive(observed)).toBe(false);
  const fn = () => {
    observed.name = "hi";
  };
  expect(fn).toThrow("target is readonly");
});

test("toRaw", () => {
  const original = {
    name: "hello",
  };
  const observed = readonly(original);
  expect(toRaw(observed)).toBe(original);
  expect(toRaw(original)).toBe(original);
  expect(toRaw(reactive(original))).toBe(original);
});

test("wrapped object reactive", () => {
  const original = {
    user: {
      age: 10,
    },
  };
  const observed = reactive(original);
  expect(observed.user.age).toBe(10);
  expect(isReactive(observed.user)).toBe(true);
  let count = 0;
  effect(() => {
    count = observed.user.age + 10;
  });
  expect(count).toBe(20);
  observed.user.age = 20;
  expect(count).toBe(30);
});

test("shallow reactive", () => {
  const original = {
    user: {
      age: 10,
    },
  };
  const observed = shallowReactive(original);
  expect(observed.user.age).toBe(10);
  expect(isReactive(observed.user)).toBe(false);
  let count = 0;
  effect(() => {
    count = observed.user.age + 10;
  });
  expect(count).toBe(20);
  observed.user.age = 20;
  expect(count).toBe(20);
});

test("shallow readonly", () => {
  const original = {
    user: {
      age: 10,
    },
  };
  const observed = shallowReadonly(original);
  expect(observed.user.age).toBe(10);
  expect(isReadonly(observed.user)).toBe(false);
  let count = 0;
  effect(() => {
    count = observed.user.age + 10;
  });
  expect(count).toBe(20);
  observed.user.age = 20;
  expect(count).toBe(20);
});
