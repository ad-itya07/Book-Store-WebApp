import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAdmin = async (data) => {
  const dataWithRole = {
    ...data,
    role: "admin",
  };
  return prisma.user.create({
    data: dataWithRole,
  });
};

export const getUser = async (username) => {
    // console.log(prisma.user.f);
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};
