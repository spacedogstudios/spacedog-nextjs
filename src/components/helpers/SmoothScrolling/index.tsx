"use client";

import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

type Props = {
  children?: ReactNode;
};

function SmoothScrolling({ children }: Props) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
