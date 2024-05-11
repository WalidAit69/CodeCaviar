import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

function SignInButton() {
  return (
    <Button
      onClick={() => signIn()}
      type="submit"
      className="font-bold text-base"
    >
      Sign in
    </Button>
  );
}

export default SignInButton;
