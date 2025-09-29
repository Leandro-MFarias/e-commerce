import prisma from "../lib/prisma.js";

export const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = (data) => {
  return prisma.user.create({ data });
};

export const updateResetToken = (email, resetToken, resetTokenExpire) => {
  return prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExpire },
  });
};

export const updatePassword = (email, data) => {
  return prisma.user.update({
    where: { email },
    data
  })
}