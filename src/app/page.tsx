import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import type { Content } from "@/types/main";
import parseContent from "@/lib/parseContent";
import { content, db } from "@/drizzle";

export const runtime = "edge";

async function getContent() {
  const rows = await db.select().from(content).all();

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

  return (
    <>
      <Header className="fixed top-0 left-0 right-0 z-10" />
      <Main content={content} />
      <Footer />
    </>
  );
}
