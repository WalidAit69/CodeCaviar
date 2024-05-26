"use client";

import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const CodeExecutor = ({ code, editor }: { code: string; editor?: boolean }) => {
  return (
    <div className="w-full flex gap-1 flex-col items-center justify-center">
      <LiveProvider code={code}>
        {editor && <LiveEditor />}
        {editor && <LiveError />}
        <LivePreview />
      </LiveProvider>
    </div>
  );
};

export default CodeExecutor;
