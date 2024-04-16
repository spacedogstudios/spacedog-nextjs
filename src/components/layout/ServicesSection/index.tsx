"use client";

import { CSSProperties } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import type { SectionProps as Props } from "@/types/main";
import { tvClassName } from "@/lib/utils";

export default function ServicesSection({
  id,
  className,
  subheading,
  tagline,
  jsx,
}: Props) {
  const containerClassName = "bg-white";
  const blockClassName =
    "grid justify-items-center md:grid-cols-services gap-12";
  const iconClassName = " relative inline-block stroke-sky-700 w-20 h-20";
  const bodyClassName =
    "text-center md:text-left [&_p]:text-gray-500 [&_h3]:text-2xl [&_h3]:pb-6 md:[&_h3]:pb-4";
  const imageStyle: CSSProperties = {
    objectPosition: "top",
    objectFit: "contain",
  };

  return (
    <Section
      id={id}
      className={tvClassName(containerClassName, className)}
      subheading={subheading}
      tagline={tagline}
    >
      {jsx && (
        <div className="flex flex-col pt-8 lg:grid lg:grid-cols-2 gap-16">
          <div className={blockClassName}>
            <div className={iconClassName}>
              <Image
                src="app-icon.svg"
                alt="App Development"
                fill
                style={imageStyle}
              />
            </div>
            <div className={bodyClassName}>{jsx[0]}</div>
          </div>
          <div className={blockClassName}>
            <div className={iconClassName}>
              <Image
                src="web-icon.svg"
                alt="Web Development"
                fill
                style={imageStyle}
              />
            </div>
            <div className={bodyClassName}>{jsx[1]}</div>
          </div>
        </div>
      )}
    </Section>
  );
}
