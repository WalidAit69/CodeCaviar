"use server";

import prisma from "@/lib/prisma";
import {
  OTPSchema,
  OTPValues,
  ResetPassShema,
  ResetPassShemaValues,
  ResetShema,
  ResetValues,
  signInShema,
  signInValues,
  signUpShema,
  signUpValues,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";
import { signIn } from "../auth";
import { Default_Login_Redirect } from "@/routes";
import { generateOTP, generateToken } from "@/lib/tokens";
import {
  getVerificationOTPbyEmail,
  getVerificationOTPbyToken,
  getVerificationTokenbyEmail,
  getVerificationTokenbyToken,
} from "../data/verification-token";
import { sendOTP, sendVerificationEmail } from "@/lib/mail";




export async function SignIn(data: signInValues) {
  try {
    const validatedFields = signInShema.safeParse(data);

    if (!validatedFields) {
      throw new Error("Invalid fields");
    }

    if (validatedFields && validatedFields.data) {
      const { email, password } = validatedFields.data;

      const user = await getUserByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.password) {
        throw new Error("Please Sign in with your provider");
      }

      const isPass = await bcrypt.compare(data.password, user.password);

      if (!isPass) {
        throw new Error("Password incorrect");
      }

      if (!user.emailVerified) {
        const existingToken = await getVerificationTokenbyEmail(user.email);

        if (existingToken) {
          const hasExpired = new Date(existingToken.expires) < new Date();

          if (hasExpired) {
            const token = await generateToken(user.email);
            await sendVerificationEmail(
              token.email,
              token.token,
              user.name as string
            );

            return { msg: "Confirmation email sent!" };
          }

          return { msg: "Confirmation email has been Already sent!" };
        }

        const token = await generateToken(user.email);
        await sendVerificationEmail(
          token.email,
          token.token,
          user.name as string
        );

        return { msg: "Confirmation email sent!" };
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: Default_Login_Redirect,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function SignUp(values: signUpValues) {
  try {
    const validatedFields = signUpShema.safeParse(values);

    if (!validatedFields) {
      throw new Error("Invalid fields");
    }

    if (validatedFields && validatedFields.data) {
      const { fullname, email, password } = validatedFields.data;

      const user = await getUserByEmail(email);

      if (user) {
        throw new Error("User Already exists");
      }

      const HashedPass = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name: fullname,
          email,
          password: HashedPass,
        },
      });

      const token = await generateToken(email);

      await sendVerificationEmail(token.email, token.token);

      return { msg: "Confirmation email sent!" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function TokenVerify(token: string) {
  try {
    const existingToken = await getVerificationTokenbyToken(token);

    if (!existingToken) {
      throw new Error("Token does not exist");
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      throw new Error("Token expired");
    }

    const user = await getUserByEmail(existingToken.email);

    if (!user) {
      throw new Error("Email does not exist!");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({ where: { id: existingToken.id } });

    return { msg: "Email verified" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function SendOtpCode(data: ResetValues) {
  try {
    const validatedFields = ResetShema.safeParse(data);

    if (!validatedFields) {
      throw new Error("Invalid fields");
    }

    if (validatedFields && validatedFields.data) {
      const { email } = validatedFields.data;

      const user = await getUserByEmail(email);

      if (!user) {
        throw new Error("Email not found");
      }

      if (!user.password) {
        throw new Error("Please sign in with your provider");
      }

      const existingOTP = await getVerificationOTPbyEmail(email);

      if (existingOTP) {
        const hasExpired = new Date(existingOTP.expires) < new Date();

        if (hasExpired) {
          const otp = await generateOTP(email);
          await sendOTP(user.email, otp.otp, user.name as string);

          return { msg: "OTP code has been sent to your email!" };
        }

        return { msg: "OTP has been Already sent!" };
      }

      const otp = await generateOTP(email);
      await sendOTP(user.email, otp.otp, user.name as string);
      return { msg: "OTP code has been sent to your email!" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function VerifyOTP(data: OTPValues) {
  try {
    const validatedFields = OTPSchema.safeParse(data);

    if (!validatedFields) {
      throw new Error("Invalid fields");
    }

    if (validatedFields && validatedFields.data) {
      const { email, pin } = validatedFields.data;

      const existingOTP = await getVerificationOTPbyToken(pin);

      if (!existingOTP) {
        throw new Error("This OTP code does not exist");
      }

      const hasExpired = new Date(existingOTP.expires) < new Date();

      if (hasExpired) {
        throw new Error("OTP code expired");
      }

      const user = await getUserByEmail(existingOTP.email);

      if (!user) {
        throw new Error("Email does not exist!");
      }

      if (user.email !== email) {
        throw new Error("Unauthorized");
      }

      return {
        msg: "OTP verified",
        existingOTP: existingOTP.otp,
        email: user.email,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ResetPassword(data: ResetPassShemaValues) {
  try {
    const validatedFields = ResetPassShema.safeParse(data);

    if (!validatedFields) {
      throw new Error("Invalid fields");
    }

    if (validatedFields && validatedFields.data) {
      const { email, password, confirmPassword } = validatedFields.data;
      const user = await getUserByEmail(email);
      const existingOTP = await getVerificationOTPbyEmail(email);

      if (!user) {
        throw new Error("Email not found");
      }

      if (!existingOTP) {
        throw new Error("OTP not found");
      }

      if (existingOTP.email !== email) {
        throw new Error("Unauthorized");
      }

      if (password !== confirmPassword) {
        throw new Error("Password don't match");
      }

      const HashedPass = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: {
          password: HashedPass,
        },
      });

      await prisma.otpVerification.delete({ where: { id: existingOTP.id } });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
