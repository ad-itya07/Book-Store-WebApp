import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBooks = async () => {
  return prisma.book.findMany();
}

export const getBookById = async (id) => {
    return await prisma.book.findUnique({
        where: {
        id: parseInt(id)
        }
    });
}

export const createBook = async (data) => {
    return await prisma.book.create({
        data: data
    })
}

