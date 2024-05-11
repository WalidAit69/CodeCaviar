import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // theme: {
  //   logo: "/logo.png",
  // },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [google, github],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
