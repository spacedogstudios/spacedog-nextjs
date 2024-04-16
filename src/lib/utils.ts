import { tv } from "tailwind-variants";

export function tvClassName(
  baseClassName: string,
  customClassName: string | undefined,
) {
  const tvObject = tv({ base: baseClassName });
  return customClassName ? tvObject({ class: customClassName }) : tvObject();
}
