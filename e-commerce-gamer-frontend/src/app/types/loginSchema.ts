import z from "zod/v4";

export const loginSchema = z.object({
  email: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório")
})

export type LoginSchema = z.infer<typeof loginSchema>