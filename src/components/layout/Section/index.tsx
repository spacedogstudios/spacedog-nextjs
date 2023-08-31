'use client';

import {useMemo} from 'react';

import Subheading from '@/components/ui/Subheading';
import type {SectionProps as Props} from '@/types/main';
import SectionContent from '@/components/ui/SectionContent';

export default function Section({id, className, subheading, tagline, children}: Props) {
  const containerClassName = `grid grid-cols-main ${className}`;

  const subheadingElement = useMemo(() => {
    if (subheading) {
      return (
        <Subheading
          id={id}
          className="flex flex-col items-center pb-8"
          subheading={String(subheading)}
          tagline={String(tagline)}
        />
      );
    }

    return null;
  }, [id, subheading, tagline]);

  const sectionElement = useMemo(() => {
    if (children) {
      return (
        <SectionContent
          className="flex flex-col items-center"
        >
          {children}
        </SectionContent>
      );
    }

    return null;
  }, [children]);

  return (
    <section id={id} className={containerClassName}>
      <div className="grid col-content py-32">
        {subheadingElement}
        {sectionElement}
      </div>
    </section>
)
}
