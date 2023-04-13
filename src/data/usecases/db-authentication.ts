import { Authentication } from "@/domain/usecases";
import { Encrypter, HashComparer } from "../protocols/cryptography";
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "../protocols/db";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encryper: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authenticationParams.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encryper.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return {
          accessToken,
          name: account.name,
        };
      }
    }
    return null;
  }
}
