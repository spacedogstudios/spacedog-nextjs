"use client";

import { routes } from "@/globals/routes";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export default function NavDesktop({
  className,
}: ComponentPropsWithoutRef<"ul">) {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const containerClassName = "hidden lg:flex lg:items-center gap-5 text-sm";

  return (
    <ul className={cn(containerClassName, className)}>
      {routes.map(({ id, title, href }) => {
        const handleClick = () => {
          lenis?.scrollTo(href, { immediate: prefersReducedMotion });
        };

        return (
          <li key={id}>
            <a
              href={href}
              onClick={handleClick}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all text-white"
            >
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
