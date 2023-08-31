"use client";

import Section from "@/components/layout/Section";
import type { SectionProps as Props } from "@/types/main";
import { tv } from "tailwind-variants";

const containerClass = tv({ base: "bg-white" });
const blockClass = "grid md:grid-cols-services gap-12";
const iconClass =
  " text-center before:inline-block before:stroke-sky-600 before:w-20";
const bodyClass =
  "text-center md:text-left [&_p]:text-gray-500 [&_h3]:text-2xl [&_h3]:pb-6 md:[&_h3]:pb-4";

export default function ServicesSection({
  id,
  className,
  subheading,
  tagline,
  jsx,
}: Props) {
  const tvOptions = className ? { class: className } : {};

  return (
    <Section
      id={id}
      className={containerClass(tvOptions)}
      subheading={subheading}
      tagline={tagline}
    >
      {jsx && (
        <div className="flex flex-col pt-8 lg:grid lg:grid-cols-2 gap-16">
          <div className={blockClass}>
            <div className={"before:content-appIcon" + iconClass}>&nbsp;</div>
            <div className={bodyClass}>{jsx[0]}</div>
          </div>
          <div className={blockClass}>
            <div className={"before:content-webIcon" + iconClass}>&nbsp;</div>
            <div className={bodyClass}>{jsx[1]}</div>
          </div>
        </div>
      )}
    </Section>
  );
}
