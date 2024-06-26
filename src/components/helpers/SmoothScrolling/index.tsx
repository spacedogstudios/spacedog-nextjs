"use client";

import { ComponentPropsWithoutRef } from "react";
import { ReactLenis } from "lenis/react";

function SmoothScrolling({
  children,
}: ComponentPropsWithoutRef<typeof ReactLenis>) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
