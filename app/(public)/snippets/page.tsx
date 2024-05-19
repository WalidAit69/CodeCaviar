import Footer from "@/components/Footer";
import Card from "@/components/snippets/Card";
import React from "react";

function page() {
  return (
    <main className="menu-blur flex flex-col items-center justify-center pt-[100px]">
      <div className="flex flex-col gap-2 text-center max-w-xl">
        <h1 className="lg:text-4xl text-xl font-bold font-Monument">All code snippets</h1>
        <p>
          Explore our whole collection of free UI components and templates built
          with the utility classes from Css and Tailwind.
        </p>
      </div>

      <div>
        <Card />
      </div>


      <Footer />
    </main>
  );
}

export default page;
