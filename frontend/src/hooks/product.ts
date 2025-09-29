import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as productApi from "@/services/products";
import { useRouter } from "next/navigation";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useNewProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/admin-page");
    },
  });
}
