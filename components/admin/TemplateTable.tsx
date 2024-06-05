"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}


function TemplateTable({ templates }: { templates: Post[] }) {
  const [Search, setSearch] = useState("");
  const [filteredtemplates, setfilteredtemplates] = useState(templates);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setfilteredtemplates(
      templates.filter((post) =>
        post.title.toLowerCase().includes(Search.toLowerCase())
      )
    );
  }, [Search, templates]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredtemplates.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredtemplates.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        className="sm:w-[300px] w-full mb-10"
        placeholder="Search by name..."
      />

      <Table>
        <TableCaption>
          {currentPosts?.length > 0 ? "List of posts." : "Empty"}
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
          {currentPosts &&
            currentPosts.map((post) => (
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

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={prevPage} />
          </PaginationItem>

          {Array(Math.ceil(filteredtemplates.length / itemsPerPage))
            .fill(0)
            .map((_, index) => (
              <Button
                className="text-black dark:text-white"
                variant={currentPage === index + 1 ? "outline" : "link"}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TemplateTable;
