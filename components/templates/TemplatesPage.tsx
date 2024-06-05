"use client";

import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import SearchInput from "../snippets/Search-Input";

const placeholders = ["Ecommerce", "Business", "Blog", "Learning", "SaaS"];

function TemplatesPage() {
  const [Search, setSearch] = useState("");

  return (
    <div>
      <SearchInput setSearch={setSearch} placeholders={placeholders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-10 gap-5 max-w-full my-20 mx-1">
        <div>
          <TemplateCard />
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;
