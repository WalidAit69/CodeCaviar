"use client";

import Link from "next/link";
import UserButton from "./widgets/navbar/UserButton";
import { ModeToggle } from "./widgets/navbar/ModeToggle";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import SignInButton from "./widgets/navbar/SignInBtn";
import NavLink from "./widgets/navbar/NavLink";
import MenuBtn from "./widgets/navbar/MenuBtn";
import Menu from "./widgets/navbar/Menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMenu } from "@/store/store";

export default function NavBar() {
  const session = useSession();
  const user = session?.data?.user;

  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  const { MenuOpen } = useMenu();
  
  return (
    <>
      <header
        className={cn(
          `fixed top-0 left-0 w-full h-[70px] bg-transparent backdrop-blur-lg shadow-sm flex items-center z-[102]`,
          MenuOpen && "backdrop-blur-none"
        )}
      >
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 1, 0.3, 1],
          }}
          className="mx-auto flex w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%] items-center justify-between gap-3"
        >
          <div className="flex items-center gap-20">
            <Link
              href="/"
              className="font-bold font-Monument text-xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] 
            bg-black dark:bg-white duration-300 hover:bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Code Caviar
            </Link>

            <div className="hidden xl:block">
              {!isAdminPage && (
                <ul className="flex items-center gap-10">
                  {NavLinks.map((navlink, index) => (
                    <li className="flex items-start gap-1" key={index}>
                      <NavLink href={navlink.link}>{navlink.title}</NavLink>
                      {navlink.soon && (
                        <span className="bg-gray-300 dark:bg-transparent font-bold text-[#ab23ff] text-[.65rem] rounded-full px-1">
                          SOON
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {isAdminPage && (
                <ul className="flex items-center gap-10 font-[600]">
                  {AdminLinks.map((navlink, index) => (
                    <li className="flex items-start gap-1" key={index}>
                      <NavLink href={navlink.link}>{navlink.title}</NavLink>
                      {navlink.soon && (
                        <span className="bg-gray-300 dark:bg-transparent font-bold text-[#ab23ff] text-[.65rem] rounded-full px-1">
                          SOON
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {user && <UserButton user={user} />}
            {session.status === "loading" && (
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-400" />
            )}
            {!user && session.status !== "loading" && <SignInButton />}

            <MenuBtn />
          </div>
        </motion.nav>
      </header>

      <Menu isAdminPage={isAdminPage}/>
    </>
  );
}

const NavLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Snippets",
    link: "/snippets",
  },
  {
    title: "Templates",
    link: "/templates",
  },
  {
    title: "Designs",
    link: "/designs",
    soon: true,
  },
  {
    title: "Projects",
    link: "/projects",
    soon: true,
  },
];

const AdminLinks = [
  {
    title: "Dashboard",
    link: "/admin",
  },
  {
    title: "Users",
    link: "/admin/users",
  },
  {
    title: "Posts",
    link: "/admin/posts",
  },
  {
    title: "Templates",
    link: "/admin/templates",
  },
  {
    title: "Designs",
    link: "/admin/designs",
    soon: true,
  },
  {
    title: "Projects",
    link: "/admin/projects",
    soon: true,
  },
];
