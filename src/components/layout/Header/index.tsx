"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";

import Nav from "@/components/layout/Nav";
import { tv } from "tailwind-variants";

type Props = {
  className?: string;
};

const containerClass = tv({ base: "grid grid-cols-main" });

export default function Header({ className }: Props) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const tvOptions = className ? { class: className } : {};

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setHidden(latest > previous);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={containerClass(tvOptions)}
    >
      <div className="col-gutter">
        <div className="flex h-16 items-center justify-between">
          <a className="site-logo" href="/">
            <Image src="sub-logo.png" alt="Homepage" width={190} height={26} />
          </a>
          <Nav className="flex justify-end" />
        </div>
      </div>
    </motion.header>
  );
}
