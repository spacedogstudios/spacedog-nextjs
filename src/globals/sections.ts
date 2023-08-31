export const SECTION_ID = {
  HOME: "home",
  ABOUT: "about",
  SERVICES: "services",
  CONTACT: "contact",
} as const;

type ObjectValues<T> = T[keyof T];

export type SectionId = ObjectValues<typeof SECTION_ID>;
