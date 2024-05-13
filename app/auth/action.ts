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
        throw new Error("Please Verify your email");
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: Default_Login_Redirect,
      });

      // revalidatePath("/");
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

      //   TODO : Send verification token email
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
