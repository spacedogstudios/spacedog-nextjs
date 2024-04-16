import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Main from "../components/layout/Main";
import type { Content } from "@/types/main";
import parseContent from "@/lib/parseContent";

export const runtime = "edge";

async function getContent() {
  const { DB } = process.env;

  if (!DB) throw new Error("Database connection failed");

  const { results } = await DB.prepare("SELECT * FROM content;").all();

  if (results) return await parseContent(results as Content[]);
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
