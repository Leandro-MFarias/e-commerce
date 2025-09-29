import z4 from "zod/v4";

export const registerSchema = z4
  .object({
    fullname: z4
      .string()
      .trim()
      .refine((value) => value.split(/\s+/).length >= 2, {
        message: "insira o nome completo (nome e sobrenome)",
      }),
    email: z4.email().min(1, "Campo obrigatório"),
    password: z4.string().min(3, "Campo obrigatório"),
    confirm: z4.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas precisam ser iguais",
    path: ["confirm"],
  });

export type RegisterSchema = z4.infer<typeof registerSchema>
