import {D1Database} from "@miniflare/d1";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Main from "../components/layout/Main";
import type {Content} from "@/types/main";
import parseContent from "@/lib/parseContent";

export const runtime = 'edge';

async function getContent() {
  const { DB } = process.env;

  if (!DB) throw new Error('Database connection failed');

  const { results } = await DB.prepare("SELECT * FROM content;").all();

  if (results) return await parseContent(results as Content[]);
}

export default async function Home() {
  let content: Record<string, Content> | undefined;

  try {
    content = await getContent();
    if (!content) {
      throw new Error('Database error');
    }
  }
  catch (error) {
    // trigger 500 page in production
    throw error;
  }

  return (
    <>
      <Header className="grid grid-cols-main fixed top-0 left-0 right-0 bg-black bg-opacity-80 z-10" />
      <Main className="" content={content} />
      <Footer className="grid-cols-main" />
    </>
  )
}
