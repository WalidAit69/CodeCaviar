"use client";

import axios from "axios";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeExecutor from "../LiveCode";
import { CodeBlock } from "../CodeBlock";
import SnippetCode from "./SnippetCode";
import { Loader2 } from "lucide-react";
import BreadCrumb from "../widgets/BreadCrumb";
import Link from "next/link";

interface CodeBlock {
  id: string;
  content: string;
  language: string;
  title: string | null;
  description: string | null;
  postId: string | null;
}

interface Snippet {
  id: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  tech: string[];
  active: boolean;
  codeblock: CodeBlock[];
  createdAt: Date;
  updatedAt: Date;
  showimg?: boolean | null;
}

function Snippet() {
  const { slug } = useParams<{ slug: string }>();

  const [Snippet, setSnippet] = useState<Snippet | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${slug}?slug=${slug}`
        );
        setSnippet(response.data);
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (error) redirect("/");

  return (
    <section className="w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%]">
      {!loading ? (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-10 w-full">
            <div className="md:max-w-[100%]">
              <BreadCrumb page="snippets" title={Snippet?.title} />

              <h1 className="font-Monument mt-3 text-lg sm:text-xl lg:text-3xl">
                {Snippet?.title}
              </h1>

              <p className="lg:text-xl sm:text-base text-[.95rem] opacity-85">
                {Snippet?.description}
              </p>

              <h3 className="mt-5">
                By <span className="font-bold">Code Caviar</span>
              </h3>

              <div className="mt-3 flex gap-2">
                {Snippet?.tech.map((tech, index) => (
                  <Link
                    href={""}
                    key={index}
                    className="hover:bg-gray-300 bg-gray-200 dark:bg-gray-600 px-4 rounded-full"
                  >
                    {tech}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center mt-14">
            {Snippet?.showimg && (
              <Image
                alt=""
                src={Snippet?.image}
                width={500}
                height={400}
                className="w-1/2"
              />
            )}

            {!Snippet?.showimg && Snippet && Snippet.codeblock && (
              <CodeExecutor code={Snippet?.codeblock[0]?.content} />
            )}

            <div className="w-full">
              {Snippet &&
                Snippet.codeblock &&
                Snippet.codeblock.map((code: CodeBlock) => (
                  <SnippetCode key={code.id} {...code} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <Loader2 className="mx-auto my-10 animate-spin text-purple-500" size={35} />
      )}
    </section>
  );
}

export default Snippet;
