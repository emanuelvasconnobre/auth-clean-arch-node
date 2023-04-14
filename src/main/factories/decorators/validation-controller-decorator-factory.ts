import { ValidationControllerDecorator } from "@/main/decorators";
import { Controller, Validation } from "@/presentation/Protocols";

export const makeValidationControllerDecorator = (
  controller: Controller,
  validation: Validation
): Controller => {
  return new ValidationControllerDecorator(controller, validation);
};
