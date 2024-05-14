import prisma from "@/lib/prisma";

// token
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

// otp
export const getVerificationOTPbyEmail = async (email: string) => {
  try {
    const OTP = await prisma.otpVerification.findFirst({
      where: { email },
    });

    return OTP;
  } catch (error) {
    throw error;
  }
};

export const getVerificationOTPbyToken = async (otp: string) => {
  try {
    const OTP = await prisma.otpVerification.findUnique({
      where: { otp },
    });

    return OTP;
  } catch (error) {
    throw error;
  }
};
