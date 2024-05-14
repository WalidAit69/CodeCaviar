import AuthVerify from "@/components/widgets/auth/AuthVerify";
import React from "react";

async function page() {
  return (
    <section className="h-full w-full flex items-center justify-center relative">
      <AuthVerify />
    </section>
  );
}

export default page;
