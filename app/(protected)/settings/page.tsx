import getSession from "@/lib/getSession";
import React from "react";

async function page() {
  const session = await getSession();

  return <div>{JSON.stringify(session?.user)}</div>;
}

export default page;
