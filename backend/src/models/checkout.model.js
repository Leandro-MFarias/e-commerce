import prisma from "../lib/prisma.js";

export const findItems = (userId) => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
};

export const addOrder = async (userId, cartItems, totalAmount) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
      },
    });

    const orderItemsData = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    await tx.cartItem.deleteMany({
      where: { userId },
    });

    return order;
  });
};