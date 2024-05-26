"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ScrollContainer from "react-indiana-drag-scroll";
import Link from "next/link";
import CodeExecutor from "../LiveCode";
import { useSnippets } from "@/app/data/snippets";

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

function SnippetCard({
  slug,
  title,
  image,
  description,
  tech,
  codeblock,
  showimg,
}: Snippet) {
  const test = useSnippets();

  return (
    <Link href={`/snippets/${slug}`}>
      <Card className="rounded-t-2xl cursor-pointer">
        <CardHeader className="sm:h-[300px] h-[250px] w-full rounded-t-2xl pt-10 items-center justify-center">
          {showimg && (
            <Image alt="" src={image} width={400} height={400} className="" />
          )}
          {!showimg && <CodeExecutor code={codeblock[0].content} />}
        </CardHeader>

        <CardContent>
          <p className="font-Monument text-sm sm:text-lg mt-5">{title}</p>
          <p className="text-sm sm:text-base truncate">{description}</p>
        </CardContent>
        <CardFooter>
          <ScrollContainer className="flex items-center gap-1 sm:gap-2 mt-5">
            {tech.map((tech, index) => (
              <p
                key={index}
                className="bg-gray-300 dark:bg-gray-600 px-4 rounded-full"
              >
                {tech}
              </p>
            ))}
          </ScrollContainer>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default SnippetCard;
