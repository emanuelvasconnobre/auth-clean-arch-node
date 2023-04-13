import { DbAuthentication } from "@/data/usecases";
import { Authentication } from "@/domain/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infra/cryptography";
import { AccountPrismaRepository } from "@/infra/db";
import env from "@/main/config/env";

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountRepository = new AccountPrismaRepository();
  return new DbAuthentication(
    accountRepository,
    bcryptAdapter,
    jwtAdapter,
    accountRepository
  );
};
