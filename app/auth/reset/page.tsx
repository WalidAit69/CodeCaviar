import AuthModal from "@/components/AuthModal";
import PasswordReset from "@/components/widgets/auth/PasswordReset";
import React from "react";

function page() {
  return (
    <section className="h-full w-full flex items-center justify-center">
      <PasswordReset/>
    </section>
  );
}

export default page;
