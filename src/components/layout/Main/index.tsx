import SectionComponent from "@/components/helpers/SectionComponent";
import HomeSection from "@/components/layout/HomeSection";

import { routes } from "@/globals/routes";
import type { Content } from "@/types/main";
import { ComponentPropsWithoutRef } from "react";
import { SECTION_ID } from "@/globals/sections";

type Props = Omit<ComponentPropsWithoutRef<"main">, "content"> & {
  content: Record<string, Content>;
};

export default function Main({ content: content }: Props) {
  return (
    <main>
      {routes.map((route) => {
        const sectionContent = content[route.id];

        if (route.id === SECTION_ID.HOME) {
          return <HomeSection key={route.id} {...sectionContent} />;
        }

        return (
          <SectionComponent key={route.id} route={route} {...sectionContent} />
        );
      })}
    </main>
  );
}
