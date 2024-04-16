"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";

import Nav from "@/components/layout/Nav";
import { tvClassName } from "@/lib/utils";

export default function Header({
  className,
}: ComponentPropsWithoutRef<"header">) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const containerClassName =
    "grid grid-cols-small md:grid-cols-main bg-black bg-opacity-80";

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
      className={tvClassName(containerClassName, className)}
    >
      <div className="col-gutter">
        <div className="flex h-16 items-center justify-between">
          <a className="site-logo" href="/">
            <Image src="sub-logo.png" alt="Homepage" width={190} height={26} />
          </a>
          <Nav />
        </div>
      </div>
    </motion.header>
  );
}
