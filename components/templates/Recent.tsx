"use server";

import React from "react";
import TemplateCard from "@/components/templates/TemplateCard";
import { getTemplates } from "@/app/data/templates";

async function Recent() {
  const templates = await getTemplates();
  return (
    <div>
      {templates &&
        templates.map((template) => (
          <TemplateCard sm template={template} key={template.id} />
        ))}
    </div>
  );
}

export default Recent;
