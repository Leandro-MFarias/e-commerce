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

export const editProductSchema = z4.object({
  name: z4.string().min(2, "Nome é obrigatório"),
  description: z4.string().min(2, "Descrição é obrigatória"),
  categories: z4.array(z4.string()).min(1, "Selecione pelo menos uma categoria"),
  price: z4.number().min(0.01, "Preço deve ser maior que zero"),
  stock: z4.number().int().min(1, "Estoque mínimo é 1"),
  imageUrl: z4.string().url("URL de imagem inválida"),
});


export type ProductSchema = z4.infer<typeof productSchema>;
export type EditProductSchema = z4.infer<typeof editProductSchema>;