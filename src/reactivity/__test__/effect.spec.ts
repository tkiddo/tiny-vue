import { effect } from "../effect";
import { reactive } from "../reactive";

test("happy path", () => {
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
