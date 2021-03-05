const Intern = require("../lib/Intern");

test("set school via constructor", () => {
  const testValue = "UW";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Foo", 1, "test@test.com", "UW");
  expect(e.getRole()).toBe(testValue);
});

test(" get school via getSchool()", () => {
  const testValue = "UW";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});