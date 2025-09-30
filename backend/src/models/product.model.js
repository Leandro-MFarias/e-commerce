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
  return prisma.product.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });
};

export const update = (id, data) => {
  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      categories: {
        connect: data.categories.map((catId) => ({ id: catId })),
      },
    },
  });
};

export const deleteProduct = (id) => {
  return prisma.product.delete({ where: { id } });
};
