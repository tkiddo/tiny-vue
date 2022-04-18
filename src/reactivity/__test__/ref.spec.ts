import { ref } from "../ref";

test("ref happy path", () => {
  const observed = ref(1);
  expect(observed.value).toBe(1);
});
