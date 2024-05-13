"use server";

import { currentRole, currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DeleteUser(id: string) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "ADMIN") {
      throw new Error("Admin cannot be deleted");
    }

    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("Error deleting user");
    throw error;
  }
}

export async function ToggleAdmin(id: string, role: string) {
  try {
    const currentuser = await currentUser();

    if (currentuser?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!currentuser.headadmin) {
      throw new Error("Only head admins can control roles");
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: { id },
      data: { role: role === "ADMIN" ? "USER" : "ADMIN" },
    });

    console.log("user updated");
  } catch (error) {
    console.log("Error updating user");
    throw error;
  }
}
