import Section from "@/components/layout/Section";
import type { SectionProps as Props } from "@/types/main";
import { tv } from "tailwind-variants";

const containerClass = tv({ base: "bg-sky-600" });

export default function AboutSection({
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
      <div className="[&_p]:text-2xl [&_p]:leading-loose [&_p]:font-serif [&_p]:font-light [&_p]:text-gray-000 [&_p]:text-center">
        {jsx && jsx[0]}
      </div>
    </Section>
  );
}
