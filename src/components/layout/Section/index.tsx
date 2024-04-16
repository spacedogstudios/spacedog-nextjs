"use client";

import Subheading from "@/components/ui/Subheading";
import type { SectionProps as Props } from "@/types/main";
import SectionContent from "@/components/ui/SectionContent";
import { tvClassName } from "@/lib/utils";

export default function Section({
  id,
  className,
  subheading,
  tagline,
  children,
}: Props) {
  const containerClassName = "grid grid-cols-small md:grid-cols-main";

  return (
    <section id={id} className={tvClassName(containerClassName, className)}>
      <div className="grid col-content py-32">
        {subheading && (
          <Subheading
            id={id}
            className="pb-8"
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
