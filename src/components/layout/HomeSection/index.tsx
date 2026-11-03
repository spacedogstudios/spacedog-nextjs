"use client";

import { useRef, CSSProperties } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SECTION_ID } from "@/globals/sections";
import type { SectionProps as Props } from "@/types/main";
import { starsDataUrl } from "@/globals/base64";
import { tvClassName } from "@/lib/utils";

export default function HomeSection({ className, tagline }: Props) {
  const ref = useRef(null);
  const imageStyle: CSSProperties = {
    objectPosition: "bottom",
    objectFit: "cover",
  };
  const containerClassName =
    "h-screen relative grid grid-cols-small md:grid-cols-main items-center overflow-hidden";
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
      className={tvClassName(containerClassName, className)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          y: backgroundY,
          // Tiny blurred preview shown until the full image loads.
          backgroundImage: `url(${starsDataUrl})`,
        }}
      >
        {/* next/image can't serve responsive sizes with images.unoptimized,
            so use <picture> with pre-sized WebP files and a JPEG fallback. */}
        <picture>
          <source
            type="image/webp"
            srcSet="/images/bg-stars-1280.webp 1280w, /images/bg-stars-1920.webp 1920w, /images/bg-stars-2560.webp 2560w"
            sizes="100vw"
          />
          <img
            src="/images/bg-stars-1920.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-bottom"
          />
        </picture>
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
          src="/bg-trees.png"
          alt=""
          role="presentation"
          fill
          style={imageStyle}
        />
      </div>
    </section>
  );
}
