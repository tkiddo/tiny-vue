import { effect } from "../effect";
import { ref } from "../ref";

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
});
