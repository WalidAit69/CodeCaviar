import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Posttable from "@/components/admin/PostTable";
import { getTemplates } from "@/app/data/templates";
import TemplateTable from "@/components/admin/TemplateTable";

export const metadata: Metadata = {
  title: "Dashboard | Templates",
};

async function page() {
  const templates = await getTemplates();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">
          {templates.length > 0 ? "Posts" : "No Posts"}
        </h1>
        <div className="flex gap-2 items-center">
          <Button>
            <Link href={"/admin/templates/new"}>Add Template</Link>
          </Button>
        </div>
      </div>

      <TemplateTable templates={templates} />
    </div>
  );
}

export default page;
