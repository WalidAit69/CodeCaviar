import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Code Caviar Dashboard",
};

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;

  !user && redirect("/api/auth/signin?callbackUrl=/admin");

  user?.role !== "admin" && redirect("/");

  return <div className="max-w-7xl mx-auto my-20">{children}</div>;
}

export default AdminLayout;
