import * as cartService from "../services/cart.service.js";

export async function getCartItemsController(req, res) {
  try {
    const result = await cartService.getCartItems(req.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function addToCartController(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const result = await cartService.addItemToCart(userId, productId);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function updateCartItemController(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await cartService.updateItemQuantity(id, quantity);

    return res.status(200).json({ message: "ATUALIZADO!!" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function deleteCartItemController(req, res) {
  try {
    const { id } = req.params;
    await cartService.deleteItemToCart(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}
