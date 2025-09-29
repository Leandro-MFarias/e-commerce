import z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Campo obrigatório"),
  description: z.string().optional(),
  categories: z.array(z.string()).nonempty("Selecione ao menos uma categoria"),
  price: z.number().int().min(1, "Campo obrigatório"),
  stock: z.number().int().min(1, "Campo obrigatório"),
  imageUrl: z.any(),
});
