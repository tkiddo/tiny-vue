import { effect } from "../effect";
import { isRef, ref, unRef } from "../ref";

test("ref happy path", () => {
  const observed = ref(1);
  let count = 0;
  effect(() => {
    count = observed.value + 1;
  });
  expect(observed.value).toBe(1);
  expect(count).toBe(2);
  observed.value = 2;
  expect(observed.value).toBe(2);
  expect(count).toBe(3);
  expect(isRef(observed)).toBe(true);
  expect(isRef(count)).toBe(false);
});

test("unRef", () => {
  const observed = ref(1);
  const source = unRef(observed);
  expect(observed.value).toBe(1);
  expect(source).toBe(1);
});
