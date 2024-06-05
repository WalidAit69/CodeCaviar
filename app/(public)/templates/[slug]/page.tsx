import React from "react";
import TemplatePage from "@/components/templates/TemplatePage";

interface Metadata {
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const response = await fetch(
    `http://localhost:3000/api/post/metadata/template?slug=${slug}`
  );
  const data = await response.json();
  
  const metadata: Metadata = {
    title: data.title,
    description: data.description,
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
    },
  };
}

async function page() {
  return (
    <main className="menu-blur w-full flex flex-col items-center justify-center sm:pt-[120px] pt-[100px] pb-5">
      <TemplatePage />
    </main>
  );
}

export default page;
