import Snippet from "@/components/snippets/Snippet";
import React from "react";

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
    `http://localhost:3000/api/post/metadata?slug=${slug}`
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

function page() {
  return (
    <main className="menu-blur w-full flex flex-col items-center justify-center sm:pt-[150px] pt-[100px]">
      <Snippet />
    </main>
  );
}

export default page;
