import { expect } from "@jest/globals";
import validator from "validator";

import { EmailValidatorAdapter } from "./email-validator-adapter";

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  test("should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_gmail.com");

    expect(isValid).toBe(false);
  });

  test("should return false if validator returns false", () => {
    const sut = makeSut();
    const isValid = sut.isValid("valid_@gmail.com");

    expect(isValid).toBe(true);
  });

  test("should call validator with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");

    sut.isValid("any_email@gmail.com");

    expect(isEmailSpy).toHaveBeenCalledWith("any_email@gmail.com");
  });
});
