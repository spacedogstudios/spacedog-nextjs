"use client";

import { routes } from "@/globals/routes";
import { useLenis } from "@studio-freight/react-lenis";
import { tvClassName } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export default function NavDesktop({
  className,
}: ComponentPropsWithoutRef<"ul">) {
  const lenis = useLenis();
  const containerClassName = "lg:flex lg:items-center gap-5 text-sm";

  return (
    <ul role="menubar" className={tvClassName(containerClassName, className)}>
      {routes.map(({ id, title, href }) => {
        const handleClick = () => {
          lenis.scrollTo(href);
        };

        return (
          <li key={id} role="menuitem">
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
