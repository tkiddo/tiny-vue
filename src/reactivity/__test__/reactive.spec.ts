import { effect } from "../effect";
import { isReactive, reactive } from "../reactive";

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

test("track and trigger", () => {
  const foo = reactive({
    number: 0,
  });
  let count = 0;
  const fn = () => {
    count = foo.number + 1;
  };
  const mockCallback = jest.fn(fn);
  effect(mockCallback);
  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(count).toBe(1);
  foo.number = 3;
  expect(mockCallback).toHaveBeenCalledTimes(2);
  expect(count).toBe(4);
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
