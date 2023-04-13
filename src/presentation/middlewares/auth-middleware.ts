import { LoadAccountByToken } from "@/domain/usecases/load-account-by-token";
import { AccessDeniedError } from "../errors";
import { forbidden, ok, serverError } from "../helpers";
import { HttpResponse, Middleware } from "../Protocols";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        );
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
