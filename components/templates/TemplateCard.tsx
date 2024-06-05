import Image from "next/image";
import React from "react";
import { IconTrendingUp3 } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

function TemplateCard({ sm, template }: { sm?: boolean; template: Template }) {
  return (
    <div>
      <div
        className={cn(
          `rounded-xl w-full sm:h-[400px] h-[300px] overflow-hidden relative shadow-2xl group`,
          sm && "sm:h-[300px]"
        )}
      >
        <div className="flex items-center justify-between px-3 w-full h-[20px] bg-gray-300">
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <span className="w-[60%] h-3 rounded-full bg-gray-200" />

          <div className="flex items-center gap-2">
            <span className="w-10 h-3 rounded-sm bg-gray-200" />
            <span className="w-10 h-3 rounded-sm bg-gray-200" />
          </div>
        </div>

        <div className="w-full h-full overflow-auto authmodal relative">
          {template.images.map((img, index) => (
            <Image
              key={index}
              width={500}
              height={400}
              src={img}
              alt="template-showcase"
              className="w-full object-cover group-hover:brightness-50 transition-all duration-300 ease-in"
            />
          ))}
        </div>

        <Link
          href={`/templates/${template.slug}`}
          className="w-16 h-7 opacity-0 group-hover:opacity-100 grid place-content-center transition-all duration-300 ease-in cursor-pointer absolute top-7 right-5 bg-gray-300 shadow-xl font-bold text-[#ab23ff] rounded-full"
        >
          <IconTrendingUp3
            stroke={2}
            className="opacity-0 group-hover:opacity-100"
          />
        </Link>
      </div>

      <span className="font-Monument mt-3 ml-1 text-xl block">
        {template.title}
      </span>
    </div>
  );
}

export default TemplateCard;
