import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/Protocols";
import { SomeZodObject, z, ZodError, ZodIssueCode } from "zod";

export class ZodValidationAdapter implements Validation {
  constructor(private readonly model: SomeZodObject) {}

  validate(input: any): Error | null {
    try {
      this.model.parse(input);
    } catch (error) {
      if (error instanceof ZodError) {
        return new InvalidParamError(error.errors[0].message);
      }
    }

    return null;
  }
}
