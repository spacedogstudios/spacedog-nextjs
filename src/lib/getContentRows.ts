import { getCloudflareContext } from "@opennextjs/cloudflare";
import { content, getDb, type ContentRow } from "@/drizzle";

// D1 lives in a single region, so a query from Melbourne adds ~130ms. Content
// rarely changes, so keep a copy in the Workers Cache API, which is local to
// each Cloudflare data centre. Edits in D1 show up within CACHE_TTL_SECONDS,
// or immediately after purging this URL (or everything) in the dashboard.
//
// The Cache API only works on the custom domain: on workers.dev previews and
// in `next dev` it's unavailable or a no-op, so those always read from D1.
const CACHE_KEY = "https://spacedog.com.au/_cache/content";
const CACHE_TTL_SECONDS = 60 * 60;

function getEdgeCache(): Cache | undefined {
  return (globalThis.caches as { default?: Cache } | undefined)?.default;
}

export async function getContentRows(): Promise<ContentRow[]> {
  const cache = getEdgeCache();

  const cached = await cache?.match(CACHE_KEY);
  if (cached) return cached.json();

  const rows = await getDb().select().from(content).all();

  if (cache && rows.length) {
    const response = new Response(JSON.stringify(rows), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `max-age=${CACHE_TTL_SECONDS}`,
      },
    });
    getCloudflareContext().ctx.waitUntil(cache.put(CACHE_KEY, response));
  }

  return rows;
}
