import { AddAccount, Authentication } from "@/domain/usecases";
import { EmailInUseError } from "../errors";
import { Controller, forbidden, ok } from "../helpers";
import { HttpResponse } from "@/presentation/Protocols";

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    const { name, email, password } = request;
    const isValid = await this.addAccount.add({
      name,
      email,
      password,
    });
    if (!isValid) {
      return forbidden(new EmailInUseError());
    }
    const authenticationModel = await this.authentication.auth({
      email,
      password,
    });
    return ok(authenticationModel);
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
