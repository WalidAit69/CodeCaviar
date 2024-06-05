import { cn } from "@/lib/utils";
import React from "react";

function TemplateSkeleton({ sm }: { sm: boolean }) {
  return (
    <div>
      <div
        className={cn(
          `rounded-xl w-full sm:h-[400px] h-[300px] overflow-hidden relative bg-gray-300 animate-pulse`,
          sm && "sm:h-[300px]"
        )}
      ></div>

      <div className="h-2 w-full bg-gray-300 rounded-xl mt-2"></div>
    </div>
  );
}

export default TemplateSkeleton;
