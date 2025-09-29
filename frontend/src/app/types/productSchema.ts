import z4 from "zod/v4";

export const productSchema = z4.object({
  name: z4.string().min(2, "Campo obrigatório"),
  description: z4.string().min(2, "Campo obrigatório"),
  categories: z4.array(z4.string()).min(1, "Pelo menos uma categoria"),
  price: z4.number().min(4, "Digite um valor válido"),
  stock: z4.number().min(1, "Estoque mínimo é 1"),
  imageUrl: z4
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Adicione uma imagem do produto",
    }),
});

export type ProductSchema = z4.infer<typeof productSchema>;
