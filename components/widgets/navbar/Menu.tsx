"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useScreenWidth from "@/hooks/useScreenWidth";
import NavLink from "./NavLink";
import { useMenu } from "@/store/store";


interface Props {
  isAdminPage: boolean;
}

function Menu({ isAdminPage }: Props) {
  const { MenuOpen, closeMenu } = useMenu();

  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth && screenWidth > 1280) {
      closeMenu();
    }

    const elements = document.querySelectorAll(
      ".menu-blur"
    ) as NodeListOf<HTMLElement>;

    if (MenuOpen) {
      document.body.style.overflow = "hidden";
      elements.forEach((element) => {
        element.style.filter = "blur(4px)";
      });
    } else {
      document.body.style.overflow = "auto";
      elements.forEach((element) => {
        element.style.filter = "none";
      });
    }
  }, [screenWidth, MenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ right: "-100%" }}
        animate={{ right: MenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="xl:hidden fixed top-0 right-0 h-[100vh] z-[101] w-full sm:w-[260px] overflow-y-auto"
      >
        <div className="absolute right-0 flex flex-col justify-between px-10 md:w-[270px] sm:w-[260px] h-full w-full bg-black overflow-y-auto">
          <ul className="flex flex-col text-white mt-32 gap-10 font-bold text-[1.05rem]">
            {!isAdminPage &&
              NavLinks.map((navlink, index) => (
                <li
                  onClick={closeMenu}
                  className="flex items-start gap-1"
                  key={index}
                >
                  <NavLink href={navlink.link}>{navlink.title}</NavLink>
                  {navlink.soon && (
                    <span className="bg-gray-300 dark:bg-gray-800 text-[#ab23ff] dark:text-[#c891eb] text-[.65rem] rounded-full px-1">
                      SOON
                    </span>
                  )}
                </li>
              ))}

            {isAdminPage &&
              AdminLinks.map((navlink, index) => (
                <li
                  onClick={closeMenu}
                  className="flex items-start gap-1"
                  key={index}
                >
                  <NavLink href={navlink.link}>{navlink.title}</NavLink>
                  {navlink.soon && (
                    <span className="bg-gray-300 dark:bg-gray-800 text-[#ab23ff] dark:text-[#c891eb] text-[.65rem] rounded-full px-1">
                      SOON
                    </span>
                  )}
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-2 my-10">
            <a
              href="#"
              className="border-[2px] border-white rounded-full p-[.4rem] hover:bg-[#4285F4] hover:border-[#4285F4] transition-all duration-300"
            >
              <Image
                src="https://ucarecdn.com/fd6e87bb-c183-442c-9286-16c117b84169/"
                alt="telegram"
                width={17}
                height={17}
                className="w-[17px] h-[17px]"
              />
            </a>

            <a
              href="#"
              className="border-[2px] border-white rounded-full p-[.4rem] hover:bg-[#4285F4] hover:border-[#4285F4] transition-all duration-300"
            >
              <Image
                src="https://ucarecdn.com/36e37a29-ec23-4f05-a5ce-3e9510ff5182/"
                alt="discord"
                width={17}
                height={17}
                className="w-[17px] h-[17px]"
              />
            </a>

            <a
              href="#"
              className="border-[2px] border-white rounded-full p-[.4rem] hover:bg-[#4285F4] hover:border-[#4285F4] transition-all duration-300"
            >
              <Image
                src="https://ucarecdn.com/726453d9-c606-4d30-a627-fa39d8837c63/"
                alt="twitter"
                width={17}
                height={17}
                className="w-[17px] h-[17px]"
              />
            </a>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, display: "none" }}
        animate={{
          opacity: MenuOpen ? 0.6 : 0,
          display: MenuOpen ? "block" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="bg-black w-full h-[100vh] fixed top-0 left-0 z-[2]"
        onClick={closeMenu}
      ></motion.div>
    </>
  );
}

export default Menu;

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
