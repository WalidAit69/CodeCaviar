import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInShema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInShema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPass = await bcrypt.compare(password, user.password);

          if (isPass) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
