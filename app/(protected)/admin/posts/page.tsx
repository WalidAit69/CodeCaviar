import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getPosts } from "@/app/data/post";
import { Metadata } from "next";
import Posttable from "@/components/admin/PostTable";

export const metadata: Metadata = {
  title: "Dashboard | Posts",
};

async function page() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">
          {posts.length > 0 ? "Posts" : "No Posts"}
        </h1>
        <div className="flex gap-2 items-center">
          <Button>
            <Link href={"/admin/posts/new"}>Add Post</Link>
          </Button>
        </div>
      </div>

      <Posttable posts={posts} />
    </div>
  );
}

export default page;
