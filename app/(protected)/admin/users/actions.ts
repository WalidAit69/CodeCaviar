"use server";

import prisma from "@/lib/prisma";

export async function DeleteUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "admin") {
      throw new Error("Admin cannot be deleted");
    }

    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("Error deleting user");
    throw error;
  }
}

export async function ToggleAdmin(
  id: string,
  role: string,
  isHeadAdmin: boolean | null | undefined
) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    if (!isHeadAdmin) {
      throw new Error("Only head admins can control roles");
    }

    await prisma.user.update({
      where: { id },
      data: { role: role === "admin" ? null : "admin" },
    });

    console.log("user updated");
  } catch (error) {
    console.log("Error updating user");
    throw error;
  }
}
