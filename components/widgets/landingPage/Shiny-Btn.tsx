"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import AnimatedShinyText from "./shiny-text";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  link: string;
  text: string;
  className: string;
  delay: number;
}

function ShinyBtn({ link, text, className, delay }: Props) {
  return (
    <motion.div
      initial={{  opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 1, 0.3, 1],
        delay: delay,
      }}
      className={cn(className)}
    >
      <Link href={link}>
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="max-sm:text-sm">{text}</span>
          <ChevronRight className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </Link>
    </motion.div>
  );
}

export default ShinyBtn;
