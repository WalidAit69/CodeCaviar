"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  start: number;
  end: number;
  delay?: number;
}

function AnimatedImage(props: Props) {
  return (
    <motion.img
      initial={{ y: props.start, opacity: 0 }}
      whileInView={{ y: props.end, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1], delay: props.delay }}
      {...props}
    />
  );
}

export default AnimatedImage;
