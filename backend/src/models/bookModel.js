import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBooks = async () => {
  return await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getABook = async (id) => {
  return await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
};

export const createBook = async (book) => {
  // console.log(book);
  return await prisma.book.create({
    data: book,
  });
};

export const deleteBook = async (id) => {
  return await prisma.book.delete({
    where: {
      id: id,
    },
  });
};
