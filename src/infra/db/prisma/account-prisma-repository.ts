import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
} from "@/data/protocols/db";
import { AddAccount } from "@/domain/usecases";
import { PrismaHelper } from "./prisma-helper";

export class AccountPrismaRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    LoadAccountByEmailRepository,
    LoadAccountByTokenRepository,
    UpdateAccessTokenRepository
{
  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    try {
      await PrismaHelper.client.user.create({
        data: accountData,
      });

      return true;
    } catch (error: any) {
      return false;
    }
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await PrismaHelper.client.user.findUnique({
      where: {
        email,
      },
    });
    return account !== null;
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result> {
    const account = await PrismaHelper.client.user.findUnique({
      where: {
        email,
      },
    });

    return account && PrismaHelper.map(account);
  }

  async loadByToken(
    token: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    const account = await PrismaHelper.client.user.findFirst({
      where: {
        accessToken: token,
        role,
      },
    });

    return account && PrismaHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await PrismaHelper.client.user.update({
      where: {
        id,
      },
      data: {
        accessToken: token,
      },
    });
  }
}
