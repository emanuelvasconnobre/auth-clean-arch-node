import { z } from "zod";

export const loginZodModel = z.object({
  email: z
    .string({
      required_error: "O campo email não pode estar vazio.",
      invalid_type_error: "O campo email precisa ser uma string.",
    })
    .email('Digite um email válido.'),
  password: z.string({
    required_error: "O campo password não pode estar vazio.",
    invalid_type_error: "O campo password precisa ser uma string.",
  }).min(8, "A senha precisa ter no mínimo 8 dígitos."),
});
