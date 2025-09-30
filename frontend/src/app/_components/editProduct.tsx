"use client";

import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { MoneyInput } from "./money-input";
import { editProductSchema, EditProductSchema } from "@/types/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Loader2, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadImage } from "@/supabase/storage/upload";
import { useUpdateProduct } from "@/hooks/product";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

interface ProductEdit {
  product: Product;
  categories: Category[];
}

export function EditProduct({ product, categories }: ProductEdit) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price / 100,
      stock: product?.stock,
      categories: (product.categories ?? []).map((cat) => cat.id),
      imageUrl: product?.imageUrl,
    },
  });

  useEffect(() => {
    setPreviewImage(product.imageUrl);
  }, [product?.imageUrl]);

  function handleShowImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  }

  function handleCategorySelect(
    field: ControllerRenderProps<EditProductSchema, "categories">,
    categoryValue: string,
  ) {
    const alreadySelected = field.value?.includes(categoryValue);

    field.onChange(
      alreadySelected
        ? field.value.filter((value: string) => value !== categoryValue)
        : [...(field.value || []), categoryValue],
    );
  }

  async function handleForm(data: EditProductSchema) {
    try {
      let imageUrl = product.imageUrl.trim();

      if (selectedFile) {
        const { media, error } = await uploadImage({
          file: selectedFile,
          bucket: "products-image",
          folder: "products",
        });
        if (error) {
          return toast.error("ERRO ao fazer upload da imagem.");
        }
        imageUrl = media.trim();
      }

      const payload = {
        name: data.name,
        description: data.description,
        price: Math.round(Number(data.price) * 100),
        stock: data.stock,
        imageUrl,
        categories: data.categories,
      };

      const result = await updateProduct({ productId: product.id, payload });
      toast.success(`${result.message}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Erro inesperado!", error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="mb-10 flex w-full flex-col md:mb-0 md:space-y-6"
    >
      <div className="flex w-full flex-col-reverse md:grid md:grid-cols-2 md:space-x-6">
        <div className="space-y-4">
          {/* NAME */}
          <div className="w-full space-y-1">
            <label className="block">Nome do Produto</label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 text-zinc-300 outline-none"
            />
            <p className="h-5 pl-2 font-bold text-red-500/80">
              {errors.name?.message}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <label className="block">Descrição</label>
            <textarea
              {...register("description")}
              className="max-h-[80px] w-full rounded-sm border-2 border-zinc-400 px-2 pt-1 text-zinc-300 outline-none md:max-h-[200px] md:min-h-[200px]"
            />
            <p className="h-5 pl-2 font-bold text-red-500/80">
              {errors.description?.message}
            </p>
          </div>

          {/* CATEGORY */}
          <div className="space-y-1">
            <label className="block">Categoria</label>
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <Command className="max-h-36 w-full rounded-sm border-2 border-zinc-400">
                  <CommandList>
                    <CommandGroup>
                      {categories.map((category: Category) => (
                        <CommandItem
                          key={category?.id}
                          value={category.id}
                          onSelect={() =>
                            handleCategorySelect(field, category.id)
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(category.id)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            />
            <p className="h-5 pl-2 font-bold text-red-500/80">
              {errors.categories?.message}
            </p>
          </div>

          {/* PRICE AND STOCK */}
          <div className="flex space-x-4">
            <div className="w-full space-y-1">
              <label className="block">Preço</label>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <MoneyInput
                    value={value}
                    onValueChange={(values) => onChange(Number(values.value))}
                    className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 text-zinc-300 outline-none"
                  />
                )}
              />
              <p className="h-5 pl-2 font-bold text-red-500/80">
                {errors.price?.message}
              </p>
            </div>

            <div className="space-y-1">
              <label className="block">Stock</label>
              <input
                type="number"
                min={1}
                {...register("stock", { valueAsNumber: true })}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 font-bold text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* IMAGEM FIELD */}
        <div className="flex flex-col justify-between space-y-4">
          {previewImage ? (
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={previewImage}
                width={420}
                height={320}
                quality={100}
                alt="Prévia da imagem"
                className="h-[260px] w-[240px] rounded-md md:h-[420px] md:w-[400px]"
              />
            </div>
          ) : (
            <div className="mt-10 flex-1 self-center">
              <Image
                src="/placeholder.jpg"
                width={520}
                height={520}
                alt="Placeholder de imagem"
                className="h-[280px] w-[260px] rounded-md opacity-90 md:h-[520px] md:w-[520px]"
              />
            </div>
          )}
          <div className="relative w-full space-y-1">
            <input
              type="file"
              accept="image"
              onChange={handleShowImage}
              className="absolute z-50 cursor-pointer opacity-0 **:w-full"
            />
            <button
              type="button"
              className="inset-0 -z-10 w-full cursor-pointer rounded-sm border-2 border-zinc-400 bg-zinc-400 px-2 py-2 text-zinc-900 outline-none"
            >
              Escolher Imagem
            </button>
            <p className="h-5 pl-2 font-bold text-red-500/80">
              {errors.imageUrl?.message as string}
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md bg-orange-600 py-3 text-lg font-bold transition duration-150 ease-in hover:bg-orange-500"
        disabled={isSubmitting}
      >
        <p>{isSubmitting ? "Adicionando.." : "Adicionar"}</p>
        <LoaderCircle
          className={`${isSubmitting ? "block animate-spin" : "hidden"}`}
        />
      </button>
    </form>
  );
}

// Se existe um novo arquivo, aí sim:
// if (defaultValue?.mediaUrl) {
//   console.log("Deletando imagem anterior: ", defaultValue.mediaUrl);
//   const bucketAndPathString = defaultValue.mediaUrl.split(
//     "/storage/v1/object/public/"
//   )[1];
//   if (bucketAndPathString) {
//     const firstSlashIndex = bucketAndPathString.indexOf("/");
//     const bucket = bucketAndPathString.slice(0, firstSlashIndex);
//     const path = bucketAndPathString.slice(firstSlashIndex + 1);
//     console.log("Deleting from bucket:", bucket, "path:", path);
//     const { error: deleteError } = await deleteImage(
//       defaultValue.mediaUrl
//     );
//     if (deleteError) {
//       console.error("Erro ao deletar imagem:", deleteError.message);
//       toast.error("Erro ao deletar imagem antiga.");
//       return; // se erro ao deletar, melhor abortar
//     } else {
//       console.log("Imagem anterior deletada com sucesso");
//     }
//   } else {
//     console.error("URL da imagem inválida:", defaultValue.mediaUrl);
//     return; // também aborta se URL inválida
//   }
// }

// useEffect(() => {
//   if (product?.imageUrl) {
//     setPreviewImage(product.imageUrl);
//   }
// }, [product?.imageUrl]);
