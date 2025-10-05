import * as usersApi from "@/services/user";
import * as authApi from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error: Error) => {
      console.error("Erro no login", error.message);
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: usersApi.getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const currentPath = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      if (currentPath === "/cart") {
        router.push("/");
      }
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Logout failed:", error.message);
    },
  });
}