import { ReactElement } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";

import type { Result, Content } from "@/types/main";
import { SECTION_ID, SectionId } from "@/globals/sections";

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

function isSectionId(id: string): id is SectionId {
  return Object.values(SECTION_ID).includes(id as SectionId);
}
async function markdownToReact(item: Result): Promise<ReactElement[]> {
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
  results: Result[],
): Promise<Record<string, Content>> {
  await Promise.all(
    results.map(
      async (item: Result) => (item.jsx = await markdownToReact(item)),
    ),
  );
  return results.reduce((result: Record<string, Content>, item) => {
    if (isSectionId(item.route_id)) {
      const id = item.route_id;
      result[item.route_id] = { ...item, id };
    }
    return result;
  }, {});
}
