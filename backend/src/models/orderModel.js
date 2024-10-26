import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAddress = async (address, prismaInstance) => {
  // console.log(address);
  return await prismaInstance.address.create({
    data: address,
  });
};

export const createOrder = async (order, prismaInstance) => {
  // console.log(order);
  return await prismaInstance.order.create({
    data: order,
  });
};

export const createOrderBooks = async (orderBooksData, prismaInstance) => {
  // console.log(orderBooksData);
  return await prismaInstance.orderBook.createMany({
    data: orderBooksData,
  });
};

export const findUniqueOrder = async (orderId) => {
  return await prisma.order.findUnique({
    where: {
      id: parseInt(orderId),
    },
    include: {
      address: true,
      orderBooks: {
        include: {
          book: true,
        },
      },
    },
  });
};

export const findAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      address: false,
      orderBooks: {
        include: {
          book: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findOrderWithEmail = async (email) => {
  return await prisma.order.findMany({
    where: {
      email: email,
    },
    include: {
      address: true,
      orderBooks: {
        include: {
          book: true,
        },
      },
    },
  });
};

export const findOrderWithEmailAndId = async (email , orderId) => {
  return await prisma.order.findUnique({
    where: {
      email: email,
      id: parseInt(orderId)
    },
    include: {
      address: true,
      orderBooks: {
        include: {
          book: true,
        },
      },
    },
  });
};

export default prisma;
