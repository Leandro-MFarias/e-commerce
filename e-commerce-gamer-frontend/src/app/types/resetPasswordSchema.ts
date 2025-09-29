import z4 from "zod/v4";

export const resetPasswordSchema = z4.object({
  password: z4.string().min(3, "Campo obrigatório"),
  confirm: z4.string(),
}).refine(data => data.password === data.confirm, {
  message: "As senhas precisam ser iguais",
  path: ["confirm"],
})

export type ResetPasswordSchema = z4.infer<typeof resetPasswordSchema>

export interface ResetPasswordData {
  email: string | null
  token: string | null
  password: string
}