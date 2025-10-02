export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categories: { id: string; name: string }[];
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categories: string[];
}

export interface ProductProp {
  payload: ProductInput;
  productId: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}
