import Snippet from "@/components/snippets/Snippet";
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Code Caviar Snippets",
  description: "Coding Platform",
};


function page() {
  return (
    <main className="menu-blur w-full flex flex-col items-center justify-center sm:pt-[150px] pt-[100px]">
      <Snippet />
    </main>
  );
}

export default page;
