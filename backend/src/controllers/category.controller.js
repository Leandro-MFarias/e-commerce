import * as categoryService from "../services/category.service.js";

export async function createCategoryController(req, res) {
  try {
    const result = await categoryService.createCategory(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function getCategoriesController(req, res) {
  const result = await categoryService.getCategories();

  return res.status(200).json(result);
}

export async function deleteCategoryController(req, res) {
  try {
    const result = await categoryService.deleteCategory(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}
