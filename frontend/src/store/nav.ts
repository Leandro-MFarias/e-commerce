import { create } from "zustand";

interface navPageProps {
  page: number
  changePage: (index: number) => void
}

export const useNavPage = create<navPageProps>((set) => ({
  page: 0,
  changePage: (index) => set({ page: index })
}))