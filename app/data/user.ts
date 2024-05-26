import prisma from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { accounts: { select: { provider: true } } },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw error;
  }
}
