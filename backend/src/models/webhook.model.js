import prisma from "../lib/prisma.js";

export async function updateOrderStatus(orderId, paymentStatus) {
  let newStatus;

  switch (paymentStatus) {
    case "approved":
      newStatus = "PAID";
      break;
    case "in_process":
    case "pending":
      newStatus = "PENDING";
      break;
    case "rejected":
      newStatus = "CANCELED";
      break;
    default:
      newStatus = "PENDING";
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  })
}