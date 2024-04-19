import Main from "@/components/layout/Main";
import type { Content } from "@/types/main";
import parseContent from "@/lib/parseContent";
import { getContentAction } from "@/actions";

export const runtime = "edge";

async function getContent() {
  const rows = await getContentAction();

  if (rows && rows.length) return await parseContent(rows);
}

export default async function Home() {
  let content: Record<string, Content>;

  try {
    content = (await getContent()) ?? {};
    if (!content) {
      throw new Error("Database error");
    }
  } catch (error) {
    // trigger 500 page in production
    throw error;
  }

  return <Main content={content} />;
}
