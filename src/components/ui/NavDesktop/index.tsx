"use client";

import { routes } from "@/globals/routes";
import { useLenis } from "@studio-freight/react-lenis";
import { tv } from "tailwind-variants";

type Props = {
  className?: string;
};

const containerClass = tv({ base: "lg:flex lg:items-center gap-5 text-sm" });

export default function NavDesktop({ className }: Props) {
  const lenis = useLenis();
  const tvOptions = className ? { class: className } : {};

  return (
    <ul role="menubar" className={containerClass(tvOptions)}>
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
