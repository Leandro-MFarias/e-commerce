import { fetchProducts } from "@/services/products";
import { create } from "zustand";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

type ProductsStore = {
  products: Product[];
  getProducts: (force?: boolean) => Promise<void>;
  setProducts: (products: Product[]) => void;
  loading: boolean;
};

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  getProducts: async (force = false) => {
    if (!force && get().products.length > 0) return;

    try {
      set({ loading: true });
      const res = await fetchProducts();
      set({ products: res });
    } catch (error) {
      console.error("ERRO ao buscar produtos: ", error);
    } finally {
      set({ loading: false });
    }
  },
}));
