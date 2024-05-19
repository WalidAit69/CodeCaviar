"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useScreenWidth from "@/hooks/useScreenWidth";
import { cn } from "@/lib/utils";

const RevealFromBottom = ({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [textHeight, setTextHeight] = useState(0);

  const ScreenWidth = useScreenWidth();

  useEffect(() => {
    if (containerRef.current) {
      setTextHeight(containerRef.current.offsetHeight);
    }

    console.log(textHeight);
  }, [text, ScreenWidth]);

  return (
    <motion.div
      className={cn(`overflow-hidden relative`, className)}
      style={{ height: textHeight }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1], delay: delay }}
    >
      <motion.span
        initial={{ top: "100%" }}
        animate={{ top: "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.3, 1], delay: delay }}
        ref={containerRef}
        className="absolute"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default RevealFromBottom;
