import prisma from "../lib/prisma.js";

export const findAll = () => {
  return prisma.product.findMany({
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const create = (data) => {
  return prisma.product.create({
    data,
    include: {
      categories: true,
    },
  });
};

export const findById = (id) => {
  return prisma.product.findUnique({ where: { id } });
};

export const update = (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  })
}

export const deleteProduct = (id) => {
  return prisma.product.delete({ where: { id } });
};
