import * as cartApi from "@/services/cart";
import { CartItem } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCartItems() {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: cartApi.getCartItems,
    refetchOnWindowFocus: false,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
}

export function useUpdateCart(cartItemId: string, quantity: number) {
  return useMutation({
    mutationFn: () => cartApi.updateCartItem(cartItemId, quantity),
  });
}

export function useDeleteToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.deleteToCart,
    onSuccess: (_, cartItemId: string) => {
      queryClient.setQueryData<CartItem[]>(["cartItems"], (old) => {
        if (!old) return [];
        return old.filter((item) => item.id !== cartItemId);
      });
    },
  });
}
