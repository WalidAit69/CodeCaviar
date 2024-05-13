import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Code Caviar Dashboard",
};

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const Role = await currentRole();

  Role !== "ADMIN" && redirect("/");

  return <div className="max-w-7xl mx-auto my-20">{children}</div>;
}

export default AdminLayout;
