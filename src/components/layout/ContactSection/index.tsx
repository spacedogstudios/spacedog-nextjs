"use client";

import Section from "@/components/layout/Section";
import type { SectionProps as Props } from "@/types/main";
import ContactForm from "@/components/ui/ContactForm";
import { tvClassName } from "@/lib/utils";

export default function ContactSection({
  id,
  className,
  subheading,
  tagline,
}: Props) {
  const containerClassName = "bg-gray-700";

  return (
    <Section
      id={id}
      className={tvClassName(containerClassName, className)}
      subheading={subheading}
      tagline={tagline}
    >
      <div className="text-left pt-4 w-full max-w-7xl">
        <h3 className="text-white text-xl uppercase pb-2">Send Us A Message</h3>
        <ContactForm />
      </div>
    </Section>
  );
}
