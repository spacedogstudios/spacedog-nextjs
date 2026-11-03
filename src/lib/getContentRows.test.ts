/**
 * @jest-environment node
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getContentRows } from "./getContentRows";

type Env = { DB: D1Database };
const context = getCloudflareContext() as unknown as {
  env: Env;
  ctx?: { waitUntil: (promise: Promise<unknown>) => void };
};

function fakeEdgeCache() {
  const store = new Map<string, string>();
  return {
    match: jest.fn(async (key: string) =>
      store.has(key) ? new Response(store.get(key)) : undefined,
    ),
    put: jest.fn(async (key: string, response: Response) => {
      store.set(key, await response.text());
    }),
  };
}

const pending: Promise<unknown>[] = [];

beforeEach(() => {
  pending.length = 0;
  context.ctx = { waitUntil: (promise) => pending.push(promise) };
});

afterEach(() => {
  delete (globalThis as { caches?: unknown }).caches;
});

it("reads from D1 when there's no edge cache", async () => {
  const rows = await getContentRows();
  expect(rows.map((row) => row.route_id)).toContain("services");
});

it("serves repeat requests from the edge cache without querying D1", async () => {
  const cache = fakeEdgeCache();
  Object.assign(globalThis, { caches: { default: cache } });
  const prepare = jest.spyOn(context.env.DB, "prepare");

  const first = await getContentRows();
  await Promise.all(pending);
  const queriesAfterFirst = prepare.mock.calls.length;
  const second = await getContentRows();

  expect(cache.put).toHaveBeenCalledTimes(1);
  expect(second).toEqual(first);
  expect(prepare.mock.calls.length).toBe(queriesAfterFirst);
});
