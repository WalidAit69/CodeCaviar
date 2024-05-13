import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import DashPostBtn from "@/components/widgets/dashboard/DashPostBtn";
import DashBtn from "@/components/widgets/dashboard/DachBtn";
import { getPosts } from "@/app/data/post";
import { Metadata } from "next";

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
        <Button>
          <Link href={"/admin/posts/new"}>Add Post</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>
          {posts.length > 0 ? "List of posts." : "Empty"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts &&
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>{post.active ? "Active" : "Inactive"}</TableCell>
                <TableCell className="flex items-center gap-2 justify-end">
                  <Button variant="outline" size="iconsm">
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Pencil size={17} />
                    </Link>
                  </Button>

                  <DashBtn id={post.id} status={post.active} />

                  <DashPostBtn id={post.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
