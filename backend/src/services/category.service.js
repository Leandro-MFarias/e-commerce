import * as categoryModel from "../models/category.model.js";

export async function createCategory(data) {
  const category = await categoryModel.findByName(data.name);

  if (category) {
    const error = new Error("Categoria já existe!");
    error.status = 400;
    throw error;
  }

  await categoryModel.create(data);

  return { message: "Categoria criada com sucesso!" };
}

export async function getCategories() {
  const result = await categoryModel.findAll();

  return result;
}

export async function deleteCategory(id) {
  try {
    await categoryModel.deleteCategory(id);

    return { message: "Categoria deletada com sucesso!" };
  } catch (error) {
    if (error.code === "P2025") {
      const customError = new Error("Categoria não encontrado");
      customError.status = 404;
      throw customError;
    }

    const customError = new Error("Erro ao deletar categoria");
    customError.status = 500;
    throw customError;
  }
}
