import { getVerificationTokenbyEmail } from "@/app/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";

export const generateToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingtoken = await getVerificationTokenbyEmail(email);

  if (existingtoken) {
    await prisma.verificationToken.delete({ where: { id: existingtoken.id } });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
