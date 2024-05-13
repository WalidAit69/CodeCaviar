import prisma from "@/lib/prisma";

export const getVerificationTokenbyEmail = async (email: string) => {
  try {
    const verifToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verifToken;
  } catch (error) {
    throw error;
  }
};

export const getVerificationTokenbyToken = async (token: string) => {
  try {
    const verifToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verifToken;
  } catch (error) {
    throw error;
  }
};
