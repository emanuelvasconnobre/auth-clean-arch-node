import { signUpZodModel, ZodValidationAdapter } from "@/infra/validators";
import { SignUpController } from "@/presentation/controllers/signup-controller";
import { Controller } from "@/presentation/helpers";
import {
  makeControllerOperationDecorator,
  makeValidationControllerDecorator,
} from "../decorators";
import { makeDbAddAccount } from "../usecases";
import { makeDbAuthentication } from "../usecases/authentication-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeDbAuthentication()
  );
  const validation = new ZodValidationAdapter(signUpZodModel);
  const validationControllerDecorator = makeValidationControllerDecorator(
    controller,
    validation
  );
  return makeControllerOperationDecorator(validationControllerDecorator);
};
