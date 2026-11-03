import type { ComponentType } from "react";

import HomeSection from "@/components/layout/HomeSection";
import AboutSection from "@/components/layout/AboutSection";
import ServicesSection from "@/components/layout/ServicesSection";
import ContactSection from "@/components/layout/ContactSection";
import { SECTION_ID, type SectionId } from "@/globals/sections";
import type { SectionProps } from "@/types/main";

export type Route = {
  id: SectionId;
  title: string;
  href: string;
  component: ComponentType<SectionProps>;
};

export const routes: Route[] = [
  {
    id: SECTION_ID.HOME,
    title: "Home",
    href: "#home",
    component: HomeSection,
  },
  {
    id: SECTION_ID.ABOUT,
    title: "About",
    href: "#about",
    component: AboutSection,
  },
  {
    id: SECTION_ID.SERVICES,
    title: "Services",
    href: "#services",
    component: ServicesSection,
  },
  {
    id: SECTION_ID.CONTACT,
    title: "Contact",
    href: "#contact",
    component: ContactSection,
  },
];
