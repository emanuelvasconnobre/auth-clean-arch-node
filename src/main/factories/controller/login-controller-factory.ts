import { loginZodModel, ZodValidationAdapter } from "@/infra/validators";
import { LoginController } from "@/presentation/controllers/login-controller";
import { Controller } from "@/presentation/helpers";
import {
  makeControllerOperationDecorator,
  makeValidationControllerDecorator,
} from "../decorators";
import { makeDbAuthentication } from "../usecases/authentication-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication());
  const validation = new ZodValidationAdapter(loginZodModel);
  const validationControllerDecorator = makeValidationControllerDecorator(
    controller,
    validation
  );
  return makeControllerOperationDecorator(validationControllerDecorator);
};
