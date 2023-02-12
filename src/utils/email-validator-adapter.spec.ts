import { expect } from "@jest/globals";
import validator from "validator";

import { EmailValidatorAdapter } from "./email-validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  test("should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_gmail.com");

    expect(isValid).toBe(false);
  });

  test("should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_@gmail.com");

    expect(isValid).toBe(true);
  });
});
