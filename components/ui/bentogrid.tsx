import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IconTrendingUp3 } from '@tabler/icons-react';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
  soon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  link: string;
  description?: string | React.ReactNode;
  header: string;
  icon?: React.ReactNode;
  soon?: boolean;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <Link href={link} className="w-full h-full relative">
        <Image
          src={header}
          alt="banner"
          width={1000}
          height={200}
          className="w-full h-full object-cover"
        />

        {soon ? (
          <span className="capitalize absolute top-2 right-2 bg-gray-300 font-bold text-[#ab23ff] rounded-full px-2">
            Soon
          </span>
        ) : (
          <span className="capitalize absolute top-2 right-2 bg-gray-300 font-bold text-[#ab23ff] rounded-full px-2">
            <IconTrendingUp3 stroke={2} />
          </span>
        )}
      </Link>

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
