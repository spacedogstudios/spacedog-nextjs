"use client";

import { motion } from "framer-motion";
import { tv } from "tailwind-variants";

import type { SectionProps as Props } from "@/types/main";
import { SECTION_ID } from "@/globals/sections";

const sections = {
  [SECTION_ID.ABOUT]: {
    subheadingSlot: "text-black",
    taglineSlot: "text-5xl md:text-7xl text-white",
    separatorSlot: "border-sky-300",
  },
  [SECTION_ID.SERVICES]: {
    subheadingSlot: "text-sky-600",
    taglineSlot: "text-4xl md:text-6xl text-black",
    separatorSlot: "border-gray-300",
  },
  [SECTION_ID.CONTACT]: {
    subheadingSlot: "text-sky-600",
    taglineSlot: "text-4xl md:text-6xl text-white",
    separatorSlot: "border-gray-500",
  },
};

type SectionKeys = keyof typeof sections;

function isSectionKey(key: string): key is SectionKeys {
  return key in sections;
}

const section = tv({
  slots: {
    subheadingSlot: "font-bold text-lg uppercase pb-4",
    taglineSlot: "text-center leading-snug pb-8",
    separatorSlot: "w-1/2 border-t",
  },
  variants: {
    section: sections,
  },
});

export default function SectionTitle({
  id,
  subheading,
  tagline,
  className,
}: Props) {
  const sectionId: SectionKeys = isSectionKey(id) ? id : SECTION_ID.ABOUT;
  const { subheadingSlot, taglineSlot, separatorSlot } = section({
    section: sectionId,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: "50%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={String(className)}
    >
      <h1 className={subheadingSlot()}>{subheading}</h1>
      <h2 className={taglineSlot()}>{tagline}</h2>
      <hr className={separatorSlot()} />
    </motion.div>
  );
}