import TemplateForm from "@/components/widgets/dashboard/(templates)/TemplateForm";
import React from "react";

function page() {
  return (
    <section className="pb-10">
      <h1 className="text-4xl font-[900] mb-10">Add Snippet</h1>
      <TemplateForm />
    </section>
  );
}

export default page;
