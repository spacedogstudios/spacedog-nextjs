'use client';

import Section from '@/components/layout/Section';
import type {SectionProps as Props} from '@/types/main';

const blockClassName = 'grid md:grid-cols-services gap-12';
const iconClassName = ' text-center before:inline-block before:stroke-sky-600 before:w-20';
const bodyClassName = 'text-center md:text-left [&_p]:text-gray-500 [&_h3]:text-2xl [&_h3]:pb-6 md:[&_h3]:pb-4';

export default function ServicesSection({route_id, className, subheading, tagline, jsx}: Props) {
  const containerClassName = `bg-white ${className}`;

  return (
    <Section
      id={route_id}
      className={containerClassName}
      subheading={subheading}
      tagline={tagline}>
      {jsx && (
        <div className="flex flex-col pt-8 lg:grid lg:grid-cols-2 gap-16">
          <div className={blockClassName}>
            <div className={'before:content-appIcon' + iconClassName}>&nbsp;</div>
            <div className={bodyClassName}>{jsx[0]}</div>
          </div>
          <div className={blockClassName}>
            <div className={'before:content-webIcon' + iconClassName}>&nbsp;</div>
            <div className={bodyClassName}>{jsx[1]}</div>
          </div>
        </div>
      )}
    </Section>
  )
}
