import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  fullname: z.string(),
  email: z.email(),
  password: z.string(),
});
