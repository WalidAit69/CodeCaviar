import PostForm from "@/components/widgets/dashboard/PostForm";
import React from "react";

function page() {
  return (
    <section>
      <h1 className="text-4xl font-[900] mb-10">Add Post</h1>
      <PostForm />
    </section>
  );
}

export default page;
