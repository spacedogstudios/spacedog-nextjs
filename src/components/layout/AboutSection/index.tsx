import Section from "@/components/layout/Section";
import type { SectionProps as Props } from "@/types/main";
import { tvClassName } from "@/lib/utils";

export default function AboutSection({
  id,
  className,
  subheading,
  tagline,
  jsx,
}: Props) {
  const containerClassName = "bg-sky-700";

  return (
    <Section
      id={id}
      className={tvClassName(containerClassName, className)}
      subheading={subheading}
      tagline={tagline}
    >
      <div className="[&_p]:text-2xl [&_p]:leading-loose [&_p]:font-light [&_p]:text-white [&_p]:text-center">
        {jsx && jsx[0]}
      </div>
    </Section>
  );
}
