import { Decrypter } from "./../protocols/cryptography/decrypter";
import { LoadAccountByToken } from "@/domain/usecases/load-account-by-token";
import { LoadAccountByTokenRepository } from "../protocols/db";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly decrypter: Decrypter
  ) {}

  async load(
    accessToken: string,
    role?: string | undefined
  ): Promise<LoadAccountByToken.Result | null> {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error: any) {
      return null;
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      );
      if (account) {
        return account;
      }
    }
    return null;
  }
}
