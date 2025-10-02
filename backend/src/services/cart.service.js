import * as cartModel from "../models/cart.model.js";

export async function getCartItems(userId) {
  if (!userId) {
    const error = new Error("Usuário não encontrado.");
    error.status = 404;
    throw error;
  }

  const result = await cartModel.getAll(userId);
  return result;
}

export async function addItemToCart(userId, productId) {
  if (!userId) {
    const error = new Error("Usuário não encontrado.");
    error.status = 404;
    throw error;
  }

  if (!productId) {
    const error = new Error("Produto não encontrado!");
    error.status = 404;
    throw error;
  }

  await cartModel.addProduct(userId, productId);

  return { message: "Produto adicionado!" };
}

export async function updateItemQuantity(id, quantity) {
  if (!id) {
    const error = new Error("Produto não encontrado!");
    error.status = 404;
    throw error;
  }
  await cartModel.updateProduct(id, quantity);
}

export async function deleteItemToCart(id) {
  if (!id) {
    const error = new Error("Produto não encontrado!");
    error.status = 404;
    throw error;
  }

  await cartModel.deleteToCart(id);
}
