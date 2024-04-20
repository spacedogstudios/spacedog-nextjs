import { ReactElement } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact, { Options } from "rehype-react";
import * as prod from "react/jsx-runtime";

import type { Content } from "@/types/main";
import { SECTION_ID, SectionId } from "@/globals/sections";
import { Jsx } from "hast-util-to-jsx-runtime";
import { ContentRow } from "@/app/drizzle";

const production: Options = {
  Fragment: prod.Fragment,
  jsx: prod.jsx as Jsx,
  jsxs: prod.jsxs as Jsx,
};

function isSectionId(id: string): id is SectionId {
  return Object.values(SECTION_ID).includes(id as SectionId);
}
async function markdownToReact(item: ContentRow): Promise<ReactElement[]> {
  const jsx: ReactElement[] = [];

  if (item.body) {
    const body = JSON.parse(item.body);

    for (const bodyText of body) {
      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeReact, production)
        .process(bodyText);

      jsx.push(file.result);
    }
  }

  return jsx;
}

export default async function parseContent(
  rows: ContentRow[],
): Promise<Record<string, Content>> {
  const content: Record<string, Content> = {};
  for (const row of rows) {
    if (isSectionId(row.route_id)) {
      const id = row.route_id;
      const jsx = await markdownToReact(row);
      content[row.route_id] = { ...row, id, jsx };
    }
  }
  return content;
}
