import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import parseContent from "@/lib/parseContent";
import { getContentRows } from "@/lib/getContentRows";

// Content lives in D1 (cached at the edge), so render on each request
// rather than at build time.
export const dynamic = "force-dynamic";

async function getContent() {
  const rows = await getContentRows();

  // An empty table would render a blank page, so fail loudly instead.
  if (!rows.length) throw new Error("No content found in the database");

  return parseContent(rows);
}

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header className="fixed top-0 left-0 right-0 z-10" />
      <Main content={content} />
      <Footer />
    </>
  );
}
