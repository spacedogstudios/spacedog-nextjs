import type { ComponentPropsWithRef, ReactElement } from "react";
import { SectionId } from "@/globals/sections";

export type Result = {
  route_id: string;
  subheading?: string;
  tagline?: string;
  body?: string;
  jsx?: ReactElement[];
};

export type Content = Result & {
  id: SectionId;
};

export type SectionProps = Partial<Content> &
  Pick<Content, "id"> &
  ComponentPropsWithRef<"section">;
