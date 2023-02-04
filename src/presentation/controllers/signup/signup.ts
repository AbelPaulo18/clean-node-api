import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount,
} from "./signup-protocols";

import { MissingParamError, InvalidParamError } from "../../errors";
import {
  badRequest,
  serverError,
  successRequest,
} from "../../helpers/http-helper";

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const account = await this.addAccount.add({ email, name, password });

      return successRequest(account);
    } catch (error) {
      return serverError();
    }
  }
}
