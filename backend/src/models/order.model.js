import prisma from "../lib/prisma.js";

export const findOrders = (userId) => {
  return prisma.order.findMany({
    where: { userId },
  })
};
