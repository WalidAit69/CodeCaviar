import getSession from "@/lib/getSession";
import React from "react";

async function page() {
  const session = await getSession();

  return (
    <div className="mt-[100px]">
      
    </div>
  );
}

export default page;
