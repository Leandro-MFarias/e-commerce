import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import * as productApi from "@/services/products";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export function useProducts(
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    ...options,
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

export function useFindProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productApi.findProduct(productId),
  });
}

export function useSearchProduct(query: string) {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => productApi.searchProducts(query),
    enabled: query.length > 2,
  });
}

export function useProductsToShow(query: string) {
  return useQuery({
    queryKey: ["categoryProduct", query],
    queryFn: () => productApi.productByCategory(query),
    enabled: !!query,
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/admin-page");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
