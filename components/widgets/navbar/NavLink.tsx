import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "antialiased font-[700] text-base transition-colors bg-black dark:bg-white duration-300 hover:bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent",
        pathname === props.href &&
          "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      )}
    ></Link>
  );
}

export default NavLink;
