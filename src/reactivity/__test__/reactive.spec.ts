import { reactive } from "../reactive";

test("happy path", () => {
  expect(true).toBe(true);
});

test("reactive function", () => {
  const observed = reactive({
    foo: "foo",
  });
  expect(observed.foo).toBe("foo");
  observed.foo = "bar";
  expect(observed.foo).toBe("bar");
});
