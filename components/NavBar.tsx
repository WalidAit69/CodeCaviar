"use client";

import Link from "next/link";
import UserButton from "./widgets/navbar/UserButton";
import { ModeToggle } from "./widgets/navbar/ModeToggle";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import SignInButton from "./widgets/navbar/SignInBtn";
import NavLink from "./widgets/navbar/NavLink";

export default function NavBar() {
  const session = useSession();
  const user = session?.data?.user;

  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] bg-transparent backdrop-blur-lg px-3 shadow-sm flex items-center z-[999]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-20">
          <Link
            href="/"
            className="font-bold font-Monument text-xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] 
            bg-black dark:bg-white duration-300 hover:bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Code Caviar
          </Link>

          {!isAdminPage && (
            <ul className="flex items-center gap-10">
              <li>
                <NavLink href={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink href={"/projects"}>Projects</NavLink>
              </li>
              <li>
                <NavLink href={"/services"}>Services</NavLink>
              </li>
            </ul>
          )}

          {isAdminPage && (
            <ul className="flex items-center gap-10 font-[600]">
              <li>
                <NavLink href={"/admin"}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink href={"/admin/posts"}>Posts</NavLink>
              </li>
              <li>
                <NavLink href={"/admin/users"}>Users</NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {user && <UserButton user={user} />}
          {session.status === "loading" && (
            <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-400" />
          )}
          {!user && session.status !== "loading" && <SignInButton />}
        </div>
      </nav>
    </header>
  );
}
