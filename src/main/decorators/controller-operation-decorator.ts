import { serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/Protocols";

export class ControllerOperationDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      return await this.controller.handle(request);
    } catch (error: Error | any) {
      return serverError(error);
    }
  }
}
