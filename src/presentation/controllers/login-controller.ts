import { Authentication } from "@/domain/usecases";
import { Controller, ok, unauthorized } from "../helpers";
import { HttpResponse } from "../Protocols";

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    const { email, password } = request;
    const authenticationModel = await this.authentication.auth({
      email,
      password,
    });
    if (!authenticationModel) {
      return unauthorized();
    }

    return ok(authenticationModel);
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
