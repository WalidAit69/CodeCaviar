"use client";

import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import SearchInput from "../snippets/Search-Input";

interface Template {
  templates: {
    id: string;
    title: string;
    slug: string;
    description: string;
    types: string[];
    images: string[];
    link: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const placeholders = ["Ecommerce", "Business", "Blog", "Learning", "SaaS"];

function TemplatesPage({ templates }: Template) {
  const [Search, setSearch] = useState("");

  return (
    <div>
      <SearchInput setSearch={setSearch} placeholders={placeholders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-10 gap-5 max-w-full my-20 mx-1">
        <div>
          {templates &&
            templates.map((template) => (
              <TemplateCard template={template} key={template.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;
