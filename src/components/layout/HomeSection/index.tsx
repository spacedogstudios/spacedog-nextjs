"use client";

import { useRef, CSSProperties } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { tv } from "tailwind-variants";
import { SECTION_ID } from "@/globals/sections";
import type { SectionProps as Props } from "@/types/main";
import { starsDataUrl } from "@/globals/base64";

const containerClass = tv({
  base: "h-screen relative grid grid-cols-small md:grid-cols-main items-center overflow-hidden",
});

export default function HomeSection({ className, tagline }: Props) {
  const ref = useRef(null);
  const imageStyle: CSSProperties = {
    objectPosition: "bottom",
    objectFit: "cover",
  };
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
          y: backgroundY,
        }}
      >
        <Image
          priority
          src="bg-stars.jpg"
          alt=""
          role="presentation"
          placeholder="blur"
          blurDataURL={starsDataUrl}
          fill
          style={imageStyle}
        />
      </motion.div>
      <motion.h1
        style={{ y: textY }}
        className="grid col-content text-white text-4xl md:text-6xl relative max-w-4xl pb-36"
      >
        {tagline}
      </motion.h1>
      <div className="absolute inset-0">
        <Image
          priority
          src="bg-trees.png"
          alt=""
          role="presentation"
          fill
          style={imageStyle}
        />
      </div>
    </section>
  );
}
