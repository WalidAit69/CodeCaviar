import { TemplateCarousel } from "@/components/templates/Carousel";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/widgets/BreadCrumb";
import Link from "next/link";
import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import TemplateCard from "@/components/templates/TemplateCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Caviar Templates",
  description: "Coding Platform",
};

function page() {
  return (
    <main className="menu-blur w-full flex flex-col items-center justify-center sm:pt-[120px] pt-[100px] pb-5">
      <section className="w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%]">
        <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-10 w-full">
          <div className="md:max-w-[50%]">
            <BreadCrumb page="templates" title="title" />

            <h1 className="font-Monument mt-3 text-lg sm:text-xl lg:text-3xl">
              Memberbase - Learning Website Template
            </h1>

            <h3 className="mt-5">
              By <span className="font-bold">Code Caviar</span>
            </h3>

            <div className="mt-3 flex gap-2">
              <Link
                href={""}
                className="bg-gray-200 text-black py-1 px-4 rounded-full text-sm font-bold hover:bg-gray-300 transition-all duration-300"
              >
                Type
              </Link>
            </div>
          </div>

          <div className="md:max-w-[50%] flex flex-col gap-5">
            <p className="lg:text-xl sm:text-base text-[.95rem] opacity-85">
              Memberbase is a free modern Webflow template with membership
              functionality. It makes it easy to build a website with gated
              content, and log-in and sign-up functionality.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Button className="w-[150px] bg-purple-500 sm:text-base text-sm">
                Use for free
              </Button>
              <Button
                variant="outline"
                className="w-[150px] border-purple-500 sm:text-base text-sm"
              >
                Design
              </Button>
            </div>
          </div>
        </div>

        <div className="my-20 w-full">
          <TemplateCarousel />
        </div>

        <div className="w-full mt-5">
          <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <span className="font-bold sm:text-2xl text-xl">
              Recent Templates
            </span>
            <Button variant="outline">
              <Link
                href={"/templates"}
                className="flex items-center gap-3 text-sm sm:text-base"
              >
                All Templates
                <IconArrowRight stroke={1.2} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 sm:gap-10 gap-5 max-w-full mx-1 mt-5">
            <TemplateCard sm />
            <TemplateCard sm />
            <TemplateCard sm />
            <TemplateCard sm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
