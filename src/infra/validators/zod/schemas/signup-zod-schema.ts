import { z } from "zod";

export const signUpZodModel = z.object({
  name: z.string({
    required_error: "O campo name não pode estar vazio.",
    invalid_type_error: "O campo name precisa ser uma string.",
  }),
  email: z
    .string({
      required_error: "O campo email não pode estar vazio.",
      invalid_type_error: "O campo email precisa ser uma string.",
    })
    .email("Digite um email válido."),
  password: z
    .string({
      required_error: "O campo password não pode estar vazio.",
      invalid_type_error: "O campo password precisa ser uma string.",
    })
    .min(8, "A senha precisa ter no mínimo 8 dígitos."),
  passwordConfirmation: z
    .string({
      required_error: "O campo passwordConfirmation não pode estar vazio.",
      invalid_type_error:
        "O campo passwordConfirmation precisa ser uma string.",
    })
    .min(8, "A confirmação da senha precisa ter no mínimo 8 dígitos."),
});
