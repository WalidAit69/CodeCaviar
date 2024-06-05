import Footer from "@/components/Footer";

import TemplatesPage from "@/components/templates/TemplatesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Code Caviar Templates",
  description: "Coding Platform",
};

function page() {
  return (
    <main className="menu-blur w-full flex flex-col items-center justify-center sm:pt-[150px] pt-[100px]">
      <section className="w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%]">
        <div className="flex flex-col items-center justify-center gap-2 text-center w-full">
          <h1 className="lg:text-4xl text-xl font-bold font-Monument max-w-xl">
            All Templates
          </h1>
          <p className="max-w-xl">
            Explore our whole collection of free UI components and templates
            built with the utility classes from Css and Tailwind.
          </p>
        </div>

        <TemplatesPage />
      </section>

      <Footer />
    </main>
  );
}

export default page;
