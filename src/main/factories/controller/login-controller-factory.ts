import { LoginController } from "@/presentation/controllers/login-controller";
import { Controller } from "@/presentation/helpers";
import { makeDbAuthentication } from "../usecases/authentication-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication());
  return controller;
};
