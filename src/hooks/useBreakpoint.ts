import { useMedia } from "react-use";

// Tailwind CSS v4 default breakpoints (see --breakpoint-* theme variables).
const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
};

export function useBreakpoint(breakpointKey: keyof typeof breakpoints) {
  return useMedia(`(min-width: ${breakpoints[breakpointKey]})`, false);
}
