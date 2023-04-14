import { ControllerOperationDecorator } from "@/main/decorators";
import { Controller } from "@/presentation/Protocols";

export const makeControllerOperationDecorator = (
  controller: Controller
): Controller => {
  return new ControllerOperationDecorator(controller);
};
