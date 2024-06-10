"use client";

import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { useClickAway } from "react-use";
import {
  LazyMotion,
  domAnimation,
  AnimatePresence,
  m as motion,
} from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

import { routes } from "@/globals/routes";
import { useLenis } from "lenis/react";
import { tvClassName } from "@/lib/utils";

export default function NavMobile({
  className,
}: ComponentPropsWithoutRef<"div">) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const lenis = useLenis();
  const containerClassName = "lg:hidden flex items-center";

  useClickAway(ref, () => setOpen(false));

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className={tvClassName(containerClassName, className)}>
        <Hamburger toggled={isOpen} size={24} color="white" toggle={setOpen} />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed right-0 top-16 h-screen overflow-hidden bg-black bg-opacity-80 w-72 z-20"
            >
              <ul role="menubar">
                {routes.map(({ id, title, href }, idx) => {
                  const handleClick = () => {
                    setOpen(false);
                    lenis && lenis.scrollTo(href);
                  };

                  return (
                    <motion.li
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + idx / 10,
                      }}
                      key={id}
                      role="menuitem"
                      className="border-b border-gray-200 hover:border-sky-700 active:border-sky-700"
                    >
                      <a
                        onClick={handleClick}
                        className="inline-block px-8 py-4 text-lg text-white hover:text-gray-200"
                        href={href}
                      >
                        {title}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
