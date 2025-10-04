import * as cartApi from "@/services/cart";
import { CartItem, UpdateCartParams } from "@/types/cartItems";
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateCartParams) =>
      cartApi.updateCartItem(cartItemId, quantity),
    onSuccess: (_, { cartItemId, quantity }) => {
      queryClient.setQueryData<CartItem[]>(["cartItems"], (old) => {
        if (!old) return [];

        return old.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item,
        );
      });
    },
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