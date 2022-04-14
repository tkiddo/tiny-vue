import { effect } from "../effect";

test("happy path", () => {
  let count = 0;
  const fn = () => {
    count += 1;
  };
  const mockCallback = jest.fn(fn);
  effect(mockCallback);
  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(count).toBe(1);
});
