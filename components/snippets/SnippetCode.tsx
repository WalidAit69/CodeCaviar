"use client";

import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { CodeBlock } from "../CodeBlock";

interface Props {
  title: string | null;
  description: string | null;
  content: string;
  language: string;
  id: string;
}

function SnippetCode(code: Props) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (
    text: string,
    id: string,
    timeout: number = 1000
  ) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedCode(id);
        setTimeout(() => {
          setCopiedCode(null);
        }, timeout);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard", err);
      });
  };

  return (
    <div className="my-10">
      <h1 className="font-Monument sm:text-xl">{code.title}</h1>
      <span className="text-slate-500">{code.description}</span>
      <div className="relative">
        {copiedCode !== code.id ? (
          <div
            onClick={() => copyToClipboard(code.content, code.id)}
            className="hover:bg-gray-700 p-2 rounded-xl text-xs absolute top-2 right-2 text-white cursor-pointer flex items-center gap-1"
          >
            <Copy className="size-4" />
            <span>Copy code</span>
          </div>
        ) : (
          <div className="hover:bg-gray-700 p-2 rounded-xl text-xs absolute top-2 right-2 text-green-500 cursor-pointer flex items-center gap-1">
            <Check className="size-4" />
            <span>Copied</span>
          </div>
        )}
        <CodeBlock code={code.content} language={code.language} />
      </div>
    </div>
  );
}

export default SnippetCode;
