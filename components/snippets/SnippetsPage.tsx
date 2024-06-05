"use client";

import React, { useEffect, useState } from "react";
import SnippetCard from "./SnippetCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import SearchInput from "./Search-Input";


const placeholders = ["Responsive Menu","Button","Input","Carousel","Side bar"];

interface CodeBlock {
  content: string;
}

interface Snippet {
  id: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  tech: string[];
  codeblock: CodeBlock[];
  showimg?: boolean | null;
}

function SnippetsPage({ snippets }: { snippets: Snippet[] }) {
  const [search, setSearch] = useState("");
  const [filteredSnippets, setFilteredSnippets] = useState(snippets);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setFilteredSnippets(
      snippets.filter((snippet) =>
        snippet.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, snippets]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredSnippets.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredSnippets.length / itemsPerPage)) {
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
      <SearchInput setSearch={setSearch} placeholders={placeholders}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-10 gap-5 max-w-full my-20 mx-1">
        {currentPosts &&
          currentPosts?.map((post: Snippet) => (
            <SnippetCard key={post.id} {...post} />
          ))}
      </div>

      <Pagination className="mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={prevPage} />
          </PaginationItem>

          {Array(Math.ceil(filteredSnippets.length / itemsPerPage))
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

export default SnippetsPage;
