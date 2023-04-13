import { DbLoadAccountByToken } from "@/data/usecases/db-load-account-by-token";
import { LoadAccountByToken } from "@/domain/usecases/load-account-by-token";
import { JwtAdapter } from "@/infra/cryptography";
import { AccountPrismaRepository, PrismaHelper } from "@/infra/db";
import env from "@/main/config/env";

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const decrypter = new JwtAdapter(env.jwtSecret);
  const accountRepository = new AccountPrismaRepository();
  return new DbLoadAccountByToken(accountRepository, decrypter);
};
