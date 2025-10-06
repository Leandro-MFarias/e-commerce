"use client";

import { useGetOrders } from "@/hooks/useOrder";
import { Loader2 } from "lucide-react";

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO string, ex: "2025-10-07T12:00:00.000Z"
}

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export function Orders() {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  return (
    <div>
      {orders.length === 0 ? (
        <div className="mt-20 flex justify-center text-3xl">
          Você não tem nenhum Pedido!
        </div>
      ) : (
        <div>
          {orders.map((order: Order) => (
            <div key={order.id}>{order.totalAmount}</div>
          ))}
        </div>
      )}
    </div>
  );
}
