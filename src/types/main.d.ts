import type { ComponentPropsWithRef, ReactElement } from "react";
import { SectionId } from "@/globals/sections";

export type Content = Omit<ContentRowt, "id"> & {
  id: SectionId;
  jsx?: ReactElement[];
};

export type SectionProps = Partial<Content> &
  Pick<Content, "id"> &
  ComponentPropsWithRef<"section">;
