"use client";

import { ComponentPropsWithoutRef } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";

function SmoothScrolling({
  children,
}: ComponentPropsWithoutRef<typeof ReactLenis>) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    // reducedMotion="user" makes framer-motion skip transform animations for
    // people who've asked their OS for less motion.
    <MotionConfig reducedMotion="user">
      {/* Smooth wheel scrolling is off for reduced motion; touch scrolling
          is always native. Changing options rebuilds Lenis without
          remounting the page. */}
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.5,
          smoothWheel: !prefersReducedMotion,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}

export default SmoothScrolling;
