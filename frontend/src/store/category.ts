import { create } from "zustand";

interface changeCategoryProps {
  id: string;
  changeCategory: (id: string) => void;
}

export const useCategoryId = create<changeCategoryProps>((set) => ({
  id: "",
  changeCategory: (categoryId: string) => set({ id: categoryId }),
}));
