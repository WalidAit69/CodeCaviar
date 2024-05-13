"use server";

import prisma from "@/lib/prisma";
import {
  signInShema,
  signInValues,
  signUpShema,
  signUpValues,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";
import { signIn } from "../auth";
import { Default_Login_Redirect } from "@/routes";
import { generateToken } from "@/lib/tokens";
import {
  getVerificationTokenbyEmail,
  getVerificationTokenbyToken,
} from "../data/verification-token";
import { sendVerificationEmail } from "@/lib/mail";

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
