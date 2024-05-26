"use client";

import axios from "axios";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeExecutor from "../LiveCode";
import { CodeBlock } from "../CodeBlock";
import SnippetCode from "./SnippetCode";
import { Loader2 } from "lucide-react";

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
        <div className="w-full flex flex-col items-center justify-center">
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
      ) : (
        <Loader2 className="mx-auto my-10 animate-spin" size={35} />
      )}
    </section>
  );
}

export default Snippet;
