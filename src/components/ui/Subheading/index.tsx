'use client';

import { motion } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';

const sectionTitle = cva('sectionTitle', {
  variants: {
    variant: {
      about: '',
      services: '',
      contact: '',
    },
    subheadingVariant: {
      about: 'text-black',
      services: 'text-sky-600',
      contact: 'text-sky-600',
    },
    taglineVariant: {
      about: 'text-5xl md:text-7xl text-white',
      services: 'text-4xl md:text-6xl text-black',
      contact: 'text-4xl md:text-6xl text-white',
    },
    separatorVariant: {
      about: 'border-sky-300',
      services: 'border-gray-300',
      contact: 'border-gray-500',
    }
  },
});

export type SectionTitleProps = {
  id: 'about' | 'services' | 'contact',
  subheading: string,
  tagline: string,
  className?: string,
}

interface Props
  extends SectionTitleProps,
    VariantProps<typeof sectionTitle> {}

export default function SectionTitle({id, subheading, tagline, className}: Props) {
  return (
    <motion.div
      initial={{opacity: 0, y: '50%'}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className={className}
    >
        <h1 className={sectionTitle({subheadingVariant: id, className: 'font-bold text-lg uppercase pb-4'})}>{subheading}</h1>
        <h2 className={sectionTitle({taglineVariant: id, className: 'text-center leading-snug pb-8'})}>{tagline}</h2>
        <hr className={sectionTitle({separatorVariant: id, className: 'w-1/2 border-t'})} />
    </motion.div>
  )
}
