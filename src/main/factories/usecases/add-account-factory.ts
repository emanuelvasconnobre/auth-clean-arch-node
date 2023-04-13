import { DbAddAccount } from "@/data/usecases";
import { AddAccount } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import { AccountPrismaRepository } from "@/infra/db";

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountRepository = new AccountPrismaRepository()
    return new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)
}