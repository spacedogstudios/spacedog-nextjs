import type { ElementType } from "react";

import HomeSection from "@/components/layout/HomeSection";
import AboutSection from "@/components/layout/AboutSection";
import ServicesSection from "@/components/layout/ServicesSection";
import ContactSection from "@/components/layout/ContactSection";

export type Route = {
  id: string;
  title: string;
  href: string;
  component: ElementType;
};

export const routes: Route[] = [
  { id: "home", title: "Home", href: "#home", component: HomeSection },
  { id: "about", title: "About", href: "#about", component: AboutSection },
  {
    id: "services",
    title: "Services",
    href: "#services",
    component: ServicesSection,
  },
  {
    id: "contact",
    title: "Contact",
    href: "#contact",
    component: ContactSection,
  },
];
