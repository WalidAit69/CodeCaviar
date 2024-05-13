import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
    headadmin: boolean | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "USER";
    headadmin: boolean | null;
  }
}
