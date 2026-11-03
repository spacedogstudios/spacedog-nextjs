import { ReactElement, createElement } from "react";
import type { ContentRow } from "@/drizzle";
import type { Content } from "@/types/main";
import type { SectionId } from "@/globals/sections";

const dummyElement = createElement("p", null, "Test");

function markdownToReact(item: ContentRow): ReactElement[] {
  const body: string[] = item.body ? JSON.parse(item.body) : [];
  return body.map((_, index) => ({ ...dummyElement, key: String(index) }));
}

// Mirrors the real parser's output shape without running the markdown pipeline.
export default async function parseContent(
  rows: ContentRow[],
): Promise<Record<string, Content>> {
  const content: Record<string, Content> = {};
  for (const row of rows) {
    const id = row.route_id as SectionId;
    content[id] = { ...row, id, jsx: markdownToReact(row) };
  }
  return content;
}
