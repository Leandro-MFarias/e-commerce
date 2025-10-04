import prisma from "../lib/prisma.js";

export const getAll = (userId) => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });
};

export const findProduct = (userId, productId) => {
  return prisma.cartItem.findFirst({
    where: { userId, productId },
  });
};

export const addProduct = (userId, productId) => {
  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
    include: { product: { select: { id: true } } },
  });
};

export const updateProduct = (id, quantity) => {
  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

export const deleteToCart = (id) => {
  return prisma.cartItem.delete({ where: { id } });
};
