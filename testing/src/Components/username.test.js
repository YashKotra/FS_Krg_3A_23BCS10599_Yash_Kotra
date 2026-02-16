import { user } from "./username";

test("returns name", () => {
  expect(user({ name: "Yash" })).toBe("Yash");
});

test("returns Guest when user is null", () => {
  expect(user(null)).toBe("Guest");
});
