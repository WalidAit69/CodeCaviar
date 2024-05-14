import {
  getVerificationOTPbyEmail,
  getVerificationTokenbyEmail,
} from "@/app/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";


export async function generateToken(email: string) {
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


export async function generateOTP(email: string) {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingOTP = await getVerificationOTPbyEmail(email);

  if (existingOTP) {
    await prisma.otpVerification.delete({ where: { id: existingOTP.id } });
  }

  const verificationOTP = await prisma.otpVerification.create({
    data: {
      email,
      otp,
      expires,
    },
  });

  return verificationOTP;
}
