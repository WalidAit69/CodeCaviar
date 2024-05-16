import { Button } from "@/components/ui/button";
import { useMenu } from "@/store/store";
import Link from "next/link";
import React from "react";

function SignInButton() {
  const { closeMenu } = useMenu();
  return (
    <Button onClick={closeMenu} className="font-bold text-base">
      <Link href={"/auth"}>Sign in</Link>
    </Button>
  );
}

export default SignInButton;
