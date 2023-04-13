import { AddAccount } from "@/domain/usecases";
import { Hasher } from "../protocols/cryptography";
import { AddAccountRepository } from "../protocols/db/account/add-account-repository";
import { CheckAccountByEmailRepository } from "../protocols/db/account/check-account-by-email-repository";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      accountData.email
    );
    let isValid = false;
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      isValid = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}
