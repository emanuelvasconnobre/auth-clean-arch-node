import { SignUpController } from "@/presentation/controllers/signup-controller";
import { Controller } from "@/presentation/helpers";
import { makeDbAddAccount } from "../usecases";
import { makeDbAuthentication } from "../usecases/authentication-factory";

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeDbAuthentication());
};
