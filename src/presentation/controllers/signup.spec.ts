import { describe, expect, test } from "@jest/globals";
import { SignUpController } from "./signup";
import { MissingParamError } from "../errors/missingParamsError";

const makeSut = (): SignUpController => {
  return new SignUpController();
};

describe("SignUp Controller", () => {
  test("should return 400 if no name is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: "any-email@mail.com",
        password: "any-password",
        passwordConfirmation: "any-password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("should return 400 if no email is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any-name",
        password: "any-password",
        passwordConfirmation: "any-password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("should return 400 if no password is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any-name",
        email: "any-email@mail.com",
        passwordConfirmation: "any-password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("should return 400 if no password confirmation is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any-name",
        email: "any-email@mail.com",
        password: "any-password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });
});
