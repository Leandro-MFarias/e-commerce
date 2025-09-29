import { ZodError } from "zod";
import * as productModel from "../models/product.model.js";
import { productSchema } from "../types/productSchema.js";

export async function listProducts() {
  const result = await productModel.findAll();

  if (!result) {
    const error = new Error("Produtos não encontrados");
    error.status = 400;
    throw error;
  }

  return result;
}

export async function createProduct(data) {
  try {
    const { name, description, price, stock, imageUrl, categories } =
      productSchema.parse(data);

    const productData = {
      name,
      description,
      price,
      stock,
      imageUrl,
      categories: {
        connect: categories.map((id) => ({ id })),
      },
    };

    await productModel.create(productData);

    return { message: "Produto criado!!" };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      const customError = new Error(`Dados inválidos: ${errorMessages}`);
      customError.status = 400;
      throw customError;
    }

    const customError = new Error("Erro ao criar produto");
    customError.status = 500;
    throw customError;
  }
}

export async function findProduct(productId) {
  const result = await productModel.findById(productId);

  if (!result) {
    const error = new Error("Produto não encontrado");
    error.status = 404;
    throw error;
  }

  return result;
}

export async function updateProduct(productId, data) {
  try {
    await productModel.update(productId, data);

    return { message: "Produto atualizado!!" };
  } catch (error) {
    if (error.code === "P2025") {
      const customError = new Error("Produto não encontrado");
      customError.status = 404;
      throw customError;
    }
    
    const customError = new Error("Erro ao atualizar produto");
    customError.status = 500;
    throw customError;
  }
}

export async function deleteProduct(productId) {
  try {
    await productModel.deleteProduct(productId);

    return { message: "Produto deletado!!" };
  } catch (error) {
    if (error.code === "P2025") {
      const customError = new Error("Produto não encontrado");
      customError.status = 404;
      throw customError;
    }

    const customError = new Error("Erro ao deletar produto");
    customError.status = 500;
    throw customError;
  }
}
