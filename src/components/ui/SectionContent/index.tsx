"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type Props = {
  className?: string;
  children?: ReactNode;
};

export default function SectionContent({ className, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "50%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
