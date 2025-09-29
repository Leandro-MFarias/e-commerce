import prisma from "../lib/prisma.js";

export const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullname: true,
      role: true,
    },
  });
};

export const getCartAmount = (id) => {
  return prisma.cartItem.findUnique()
}