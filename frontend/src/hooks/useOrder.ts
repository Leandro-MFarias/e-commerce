import { useQuery } from "@tanstack/react-query";
import * as orderApi from "@/services/order"

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getOrders,
  })
}