import PostForm from "@/components/widgets/dashboard/PostForm";
import prisma from "@/lib/prisma";
import React from "react";

async function page({ params: { id } }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { codeblock: true },
  });

  return (
    <section className="pb-10">
      <h1 className="text-4xl font-[900] mb-10">Edit Post</h1>
      <PostForm post={post} />
    </section>
  );
}

export default page;
