import prisma from "../lib/prisma.js";

export const findByName = (name) => {
  return prisma.category.findUnique({ where: { name } });
};

export const create = (data) => {
  return prisma.category.create({ data });
};

export const findAll = () => {
  return prisma.category.findMany();
};

export const deleteCategory = (id) => {
  return prisma.category.delete({ where: { id } });
};
