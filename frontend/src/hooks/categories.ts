import * as categoryApi from "@/services/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getCategories,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useNewCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.refresh();
    },
  });
}
