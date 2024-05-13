import { CircleAlert } from "lucide-react";
import React from "react";

function ErrorBadge({ error }: { error: string }) {
  return (
    <div className="bg-red-100 w-fit flex items-center justify-center mx-auto py-3 px-6 rounded-md gap-2">
      <CircleAlert className="text-red-600" size={20}/>
      <p className="text-red-600 font-bold">{error}</p>
    </div>
  );
}

export default ErrorBadge;
