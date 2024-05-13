import { BadgeCheck } from "lucide-react";
import React from "react";

function SuccessBadge({ msg }: { msg: string }) {
  return (
    <div className="bg-green-100 w-fit flex items-center justify-center mx-auto py-3 px-6 rounded-md gap-2">
      <BadgeCheck className="text-green-600" size={20} />
      <p className="text-green-600 font-bold">{msg}</p>
    </div>
  );
}

export default SuccessBadge;
