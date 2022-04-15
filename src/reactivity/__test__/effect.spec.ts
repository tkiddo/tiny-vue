import { effect } from "../effect";
import { reactive } from "../reactive";

test("track and trigger", () => {
  const foo = reactive({
    number: 0,
  });
  const bar = reactive({
    plus: 3,
  });
  let count = 0;
  const fn = jest.fn(() => {
    count = foo.number + bar.plus + foo.number;
  });
  effect(fn);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(count).toBe(3);
  foo.number = 3;
  bar.plus = 1;
  expect(count).toBe(7);
  expect(fn).toHaveBeenCalledTimes(3);
});
