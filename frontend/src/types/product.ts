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