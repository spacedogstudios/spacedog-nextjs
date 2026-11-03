import { twMerge } from "tailwind-merge";

// Joins class names, letting later Tailwind classes override earlier ones.
export function cn(...classNames: (string | undefined)[]) {
  return twMerge(classNames);
}
