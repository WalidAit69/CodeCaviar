import AuthModal from "@/components/AuthModal";
import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  session && redirect("/");

  return (
    <section className="h-[92.3vh] flex items-center justify-center bg-black/30 dark:bg-black/5 filter">
      <AuthModal />
    </section>
  );
}

export default page;
