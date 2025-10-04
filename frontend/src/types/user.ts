import { CartItem } from "./cartItems";

export interface User {
  id: string;
  fullname: string;
  role: string;
  cartItems: CartItem[];
}