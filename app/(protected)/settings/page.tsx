import { auth } from "@/app/auth";
import React from "react";

async function page() {
  const session = await auth();

  return <div>{JSON.stringify(session?.user)}</div>;
}

export default page;
