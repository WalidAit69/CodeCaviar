"use client";

import { TemplateCarousel } from "@/components/templates/Carousel";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/widgets/BreadCrumb";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Recent from "./Recent";
import TemplateSkeleton from "./TemplateSkeleton";

interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  types: string[];
  images: string[];
  link: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function TemplatePage() {
  const { slug } = useParams<{ slug: string }>();

  const [Template, setTemplate] = useState<Template | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/post/template/${slug}?slug=${slug}`
        );
        setTemplate(res.data);
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (error) redirect("/");

  return (
    <section className="w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%]">
      {!loading ? (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-10 w-full">
            <div className="md:max-w-[50%]">
              <BreadCrumb page="templates" title={Template?.slug} />

              <h1 className="font-Monument mt-3 text-lg sm:text-xl lg:text-3xl">
                {Template?.title}
              </h1>

              <h3 className="mt-5">
                By <span className="font-bold">Code Caviar</span>
              </h3>

              <div className="mt-3 flex gap-2">
                {Template?.types.map((type, index) => (
                  <Link
                    key={index}
                    href={""}
                    className="bg-gray-200 text-black py-1 px-4 rounded-full text-sm font-bold hover:bg-gray-300 transition-all duration-300"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:max-w-[50%] flex flex-col gap-5">
              <p className="lg:text-xl sm:text-base text-[.95rem] opacity-85">
                {Template?.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a target="_blank" href={`/${Template?.link}`}>
                  <Button className="w-[150px] bg-purple-500 sm:text-base text-sm">
                    Use for free
                  </Button>
                </a>
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
            <TemplateCarousel images={Template?.images} />
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
              <Suspense fallback={<TemplateSkeleton sm />}>
                <Recent />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <Loader2
          className="mx-auto my-10 animate-spin text-purple-500"
          size={35}
        />
      )}
    </section>
  );
}

export default TemplatePage;
