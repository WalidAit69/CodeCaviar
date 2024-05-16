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
        "antialiased font-bold text-base transition-colors duration-300 hover:text-[#ab23ff]",
        pathname === props.href && "text-[#ab23ff] font-bold"
      )}
    ></Link>
  );
}

export default NavLink;
