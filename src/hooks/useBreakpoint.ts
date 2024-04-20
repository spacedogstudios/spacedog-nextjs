import { useMedia } from "react-use";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "@/../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig?.theme?.screens || {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue =
    breakpoints[breakpointKey as keyof typeof breakpoints];
  return useMedia(`(min-width: ${breakpointValue})`, false);
}
