"use client";

import React, { useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconBellRinging } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/store/store";

const SideBarLinks = [
  {
    title: "Account",
    icon: <IconUserCircle stroke={1.5} />,
  },
  {
    title: "Security",
    icon: <IconLock stroke={1.5} />,
  },
  {
    title: "Notifications",
    icon: <IconBellRinging stroke={1.5} />,
  },
  {
    title: "Delete",
    icon: <IconTrash stroke={1.5} />,
  },
];

function SideBar() {
  const { active, setactive } = useSettings();

  function HandleClick(index: number) {
    setactive(index);
  }

  return (
    <div className="md:w-[300px] w-full bg-white rounded-xl p-5 space-y-7">
      <span className="font-Monument text-lg">Settings</span>

      <ul className="md:space-y-7 grid sm:grid-cols-4 grid-cols-2 w-full gap-4 items-center justify-center md:block">
        {SideBarLinks.map((link, index) => (
          <li
            key={index}
            className="flex items-center gap-1 cursor-pointer group"
            onClick={() => HandleClick(index)}
          >
            <button
              className={cn(
                `text-sm sm:text-base font-bold flex items-center gap-1 cursor-pointer active:scale-[.99] group-hover:text-[#422caf]`,
                active === index && "text-[#422caf]"
              )}
            >
              {link.icon}
              <span>{link.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
