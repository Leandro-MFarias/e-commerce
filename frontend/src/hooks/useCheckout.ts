import { createCheckout } from "@/services/checkout";
import { useMutation } from "@tanstack/react-query";

export function useCheckout() {
  return useMutation({
    mutationFn: createCheckout,
  });
}