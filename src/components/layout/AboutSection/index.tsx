import Section from '@/components/layout/Section';
import type {SectionProps as Props} from '@/types/main';

export default function AboutSection({route_id, className, subheading, tagline, jsx}: Props) {
  const containerClassName = `bg-sky-600 ${className}`;

  return (
    <Section
      id={route_id}
      className={containerClassName}
      subheading={subheading}
      tagline={tagline}>
        <div className="[&_p]:text-2xl [&_p]:leading-loose [&_p]:font-serif [&_p]:font-light [&_p]:text-gray-000 [&_p]:text-center">
            {jsx && jsx[0]}
        </div>
    </Section>
  )
}
