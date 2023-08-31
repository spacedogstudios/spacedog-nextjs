"use client";

import NavDesktop from "@/components/ui/NavDesktop";
import NavMobile from "@/components/ui/NavMobile";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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

  return (
    <nav className={className}>
      <NavElement isLarge={isLarge} />
    </nav>
  );
}
