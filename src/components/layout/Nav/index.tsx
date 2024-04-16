"use client";

import NavDesktop from "@/components/ui/NavDesktop";
import NavMobile from "@/components/ui/NavMobile";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { tvClassName } from "@/lib/utils";

type Props = {
  className?: string;
};

type NavProps = {
  isLarge: boolean;
};

function NavElement({ isLarge }: NavProps) {
  if (isLarge) {
    return <NavDesktop />;
  }
  return <NavMobile />;
}

export default function Nav({ className }: Props) {
  const isLarge = useBreakpoint("lg");
  const containerClassName = "flex justify-end";

  return (
    <nav className={tvClassName(containerClassName, className)}>
      <NavElement isLarge={isLarge} />
    </nav>
  );
}
