"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SectionProps as Props } from "@/types/main";
import { tv } from "tailwind-variants";
import { SECTION_ID } from "@/globals/sections";

const containerClass = tv({
  base: "h-screen relative grid grid-cols-main items-center overflow-hidden",
});

export default function HomeSection({ className, tagline }: Props) {
  const ref = useRef(null);
  const tvOptions = className ? { class: className } : {};
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <section
      id={SECTION_ID.HOME}
      ref={ref}
      className={containerClass(tvOptions)}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(bg-stars.jpg)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.h1
        style={{ y: textY }}
        className="grid col-content text-white text-4xl md:text-6xl relative max-w-4xl pb-36"
      >
        {tagline}
      </motion.h1>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(bg-trees.png)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </section>
  );
}
