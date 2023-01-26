import { generateValidationSchema } from "./generateValidationSchema";

describe("generateValidationSchema", () => {
  test("1 field", () => {
    expect(generateValidationSchema().validate({})).toBeTruthy();
  });

  test("nested array field", () => {});
});
