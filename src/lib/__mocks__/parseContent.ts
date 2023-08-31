import { ReactElement, createElement } from "react";
import type { Content } from "@/types/main";

const dummyElement = createElement("p", null, "Test");

async function markdownToReact(item: Content): Promise<ReactElement[]> {
  const jsx: ReactElement[] = [];

  if (item.body) {
    const body = JSON.parse(item.body);

    body.forEach(() => jsx.push(dummyElement));
  }

  return jsx;
}

export default async function parseContent(
  content: Content[],
): Promise<Record<string, Content>> {
  await Promise.all(
    content.map(
      async (item: Content) => (item.jsx = await markdownToReact(item)),
    ),
  );
  return content.reduce((result: Record<string, Content>, item) => {
    result[item.route_id] = { ...item };
    return result;
  }, {});
}
