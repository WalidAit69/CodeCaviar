import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function SignInButton() {
  return (
    <Button className="font-bold text-base">
      <Link href={"/auth"}>Sign in</Link>
    </Button>
  );
}

export default SignInButton;
