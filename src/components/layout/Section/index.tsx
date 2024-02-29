"use client";

import { tv } from "tailwind-variants";

import Subheading from "@/components/ui/Subheading";
import type { SectionProps as Props } from "@/types/main";
import SectionContent from "@/components/ui/SectionContent";
const containerClass = tv({
  base: "grid grid-cols-small md:grid-cols-main",
});

export default function Section({
  id,
  className,
  subheading,
  tagline,
  children,
}: Props) {
  const tvOptions = className ? { class: className } : {};

  return (
    <section id={id} className={containerClass(tvOptions)}>
      <div className="grid col-content py-32">
        {subheading && (
          <Subheading
            id={id}
            className="flex flex-col items-center pb-8"
            subheading={String(subheading)}
            tagline={String(tagline)}
          />
        )}
        {children && (
          <SectionContent className="flex flex-col items-center">
            {children}
          </SectionContent>
        )}
      </div>
    </section>
  );
}
