import { CartItem } from "@/types/cartItems";

export function TotalPrice(products: CartItem[]) {
  return products.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  );
}
