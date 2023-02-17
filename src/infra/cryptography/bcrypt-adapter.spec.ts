import bcrypt from "bcrypt";
import { expect, jest } from "@jest/globals";
import { BcryptAdapter } from "./bcrypt-adapter";

const makeBcryptAdapter = () => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);

  return { sut, salt };
};

describe("Bcrypt Adapter", () => {
  test("should call bcrypt with correct values", async () => {
    const { sut, salt } = makeBcryptAdapter();
    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });
});
