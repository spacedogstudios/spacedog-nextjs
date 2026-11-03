import type { ComponentPropsWithRef, ReactElement } from "react";
import type { SectionId } from "@/globals/sections";
import type { ContentRow } from "@/drizzle/schema";

export type Content = Omit<ContentRow, "id"> & {
  id: SectionId;
  jsx?: ReactElement[];
};

export type SectionProps = Partial<Content> &
  Pick<Content, "id"> &
  ComponentPropsWithRef<"section">;
