'use client';

import { routes } from '@/globals/routes';
import {useLenis} from '@studio-freight/react-lenis';

type Props = {
  className?: string
}

export default function NavDesktop({className}: Props) {
  const lenis = useLenis();

  const navDesktopClassName = `lg:flex lg:items-center gap-5 text-sm ${className}`;

  return (
    <ul
      role="menubar"
      className={navDesktopClassName}
    >
      {routes.map(({id, title, href}) => {
        const handleClick = () => {
          lenis.scrollTo(href);
        };

        return (
          <li
            key={id}
            role="menuitem"
          >
            <a
              href={href}
              onClick={handleClick}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all text-white"
            >
              {title}
            </a>
          </li>
        );
      })
      }
    </ul>
  )
}
