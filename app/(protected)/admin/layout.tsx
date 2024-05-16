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

  return (
    <main className="menu-blur md:h-[100vh] py-[110px] w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%] mx-auto">
      {children}
    </main>
  );
}

export default AdminLayout;
