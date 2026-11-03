import NavDesktop from "@/components/ui/NavDesktop";
import NavMobile from "@/components/ui/NavMobile";
import { tvClassName } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

// Both navs are rendered and CSS shows the right one (NavDesktop is
// `hidden lg:flex`, NavMobile is `lg:hidden`), so the server-rendered HTML
// already matches the screen size.
export default function Nav({ className }: ComponentPropsWithoutRef<"nav">) {
  const containerClassName = "flex justify-end";

  return (
    <nav className={tvClassName(containerClassName, className)}>
      <NavDesktop />
      <NavMobile />
    </nav>
  );
}
