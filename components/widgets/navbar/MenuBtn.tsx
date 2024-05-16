import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMenu } from "@/store/store";
import React from "react";

function MenuBtn() {
  const { MenuOpen, toggleMenu } = useMenu();

  return (
    <div className="items-center justify-center flex xl:hidden z-[9999]">
      <Button
        variant="outline"
        className={cn(
          "relative sm:w-10 sm:h-10 w-10  h-10 rounded-md transform transition-all duration-300 hover:bg-[#a8a8e7]",
          {
            "bg-[#422caf]": MenuOpen,
            "bg-transparent": !MenuOpen,
          }
        )}
        onClick={toggleMenu}
      >
        <div
          className={cn(
            "sm:w-6 w-5 h-[2px] transition-all duration-300 absolute left-1/2",
            {
              "top-[50%] -translate-y-1/2 -translate-x-1/2 rotate-45 bg-white":
                MenuOpen,
              "top-[25%] -translate-x-1/2 rotate-0 translate-y-0 bg-[#422caf]":
                !MenuOpen,
            }
          )}
        ></div>
        <div
          className={cn(
            "sm:w-6 w-5 h-[2px] transition-all duration-300 absolute left-1/2",
            {
              "opacity-0 bg-white": MenuOpen,
              "top-[45%] -translate-x-1/2 opacity-100 bg-[#422caf]": !MenuOpen,
            }
          )}
        ></div>
        <div
          className={cn(
            "sm:w-6 w-5 h-[2px] transition-all duration-300 absolute left-1/2",
            {
              "top-[50%] -translate-y-1/2 -translate-x-1/2 -rotate-45 bg-white":
                MenuOpen,
              "top-[65%] -translate-x-1/2 rotate-0 translate-y-0 bg-[#422caf]":
                !MenuOpen,
            }
          )}
        ></div>
      </Button>
    </div>
  );
}

export default MenuBtn;
