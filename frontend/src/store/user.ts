import { logout } from "@/services/auth";
import { userInfo } from "@/services/user";
import { create } from "zustand";

type User = {
  fullname: string;
  email: string;
  role: string
};

type UserStore = {
  user: User | null;
  getUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  getUser: async () => {
    try {
      const res = await userInfo();
      set({ user: res });
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
      set({ user: null });
    }
  },

  logout: async () => {
    try {
      await logout();
      set({ user: null });
    } catch (error) {
      console.error("ERRO ao deslogar: ", error);
    }
  },
}));
