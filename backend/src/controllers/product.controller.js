import * as productService from "../services/product.service.js";

export async function getProductsController(req, res) {
  try {
    const result = await productService.listProducts();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.status });
  }
}

export async function craeteProductController(req, res) {
  try {
    const result = await productService.createProduct(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function getProductController(req, res) {
  try {
    const result = await productService.findProduct(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function updateProductController(req, res) {
  try {
    const result = await productService.updateProduct(req.params.id, req.body)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message })
  }
}

export async function deleteProductController(req, res) {
  try {
    const result = await productService.deleteProduct(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}
