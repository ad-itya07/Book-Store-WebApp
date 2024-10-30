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

export const getTotalOrdersCount = async () => {
  return await prisma.order.count();
}

export const getTotalSales = async () => {
  const result = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });
  return result._sum.totalPrice;
}

export const getMonthlySales = async () => {
  const result = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: {
      totalPrice: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const monthlySales = result.reduce((acc, order) => {
    const month = order.createdAt.getMonth() + 1;
    const year = order.createdAt.getFullYear();

    const monthKey = `${year}-${month}`
    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }

    acc[monthKey] += order._sum.totalPrice;
    return acc;
  }, {});

  return monthlySales;
}

export default prisma;
