import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount,
} from "./signup-protocols";

import { MissingParamError, InvalidParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body;

      const isValid = this.emailValidator.isValid(email);

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      if (!isValid) return badRequest(new InvalidParamError("email"));

      const account = this.addAccount.add({ email, name, password });

      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
      return serverError();
    }
  }
}
