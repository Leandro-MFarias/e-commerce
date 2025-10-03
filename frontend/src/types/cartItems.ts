import { string } from "zod/v4";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface UpdateCartParams {
  cartItemId: string
  quantity: number
}