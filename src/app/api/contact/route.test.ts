/**
 * @jest-environment node
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ContactResponse } from "@/globals/schema";
import { POST } from "./route";

// jest-fetch-mock swaps in a Response polyfill without the static json()
// that NextResponse.json() relies on.
if (!("json" in Response)) {
  Object.assign(Response, {
    json: (data: unknown, init?: ResponseInit) =>
      new Response(JSON.stringify(data), {
        ...init,
        headers: { "content-type": "application/json", ...init?.headers },
      }),
  });
}

const env = getCloudflareContext().env as unknown as Record<string, unknown>;
const valid = {
  name: "Pat O'Brien",
  email: "pat@example.com",
  message: "Hi & bye <3",
};

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "cf-connecting-ip": "1.2.3.4",
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  fetchMock.resetMocks();
  env.CONTACT_RATE_LIMITER = {
    limit: jest.fn(async () => ({ success: true })),
  };
  jest.spyOn(console, "error").mockImplementation(() => {});
});

it("sends a plain-text email without HTML escaping", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ id: "1" }));
  const res = await post(valid);

  expect(res.status).toBe(200);
  const sent = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
  expect(sent.text).toContain("Name: Pat O'Brien");
  expect(sent.text).toContain("Message: Hi & bye <3");
  expect(sent.reply_to).toBe("pat@example.com");
});

it("returns 400 with field errors for invalid input", async () => {
  const res = await post({ name: "P", email: "nope", message: "" });

  expect(res.status).toBe(400);
  const { errors } = (await res.json()) as ContactResponse;
  expect(Object.keys(errors ?? {}).sort()).toEqual([
    "email",
    "message",
    "name",
  ]);
  expect(fetchMock).not.toHaveBeenCalled();
});

it("rejects overly long messages", async () => {
  const res = await post({ ...valid, message: "x".repeat(5001) });
  expect(res.status).toBe(400);
});

it("returns 400 for malformed JSON", async () => {
  const res = await post("{bad");
  expect(res.status).toBe(400);
});

it("pretends to succeed for bots that fill in the honeypot", async () => {
  const res = await post({ ...valid, website: "http://spam.example" });

  expect(res.status).toBe(200);
  expect(fetchMock).not.toHaveBeenCalled();
});

it("returns 429 when the rate limit is exceeded", async () => {
  env.CONTACT_RATE_LIMITER = {
    limit: jest.fn(async () => ({ success: false })),
  };
  const res = await post(valid);

  expect(res.status).toBe(429);
  expect(fetchMock).not.toHaveBeenCalled();
});

it("returns 502 when the email service rejects the message", async () => {
  fetchMock.mockResponseOnce("bad key", { status: 401 });
  const res = await post(valid);

  expect(res.status).toBe(502);
  const body = (await res.json()) as ContactResponse;
  expect(body.errors?.root?.message).toMatch(/couldn't be sent/);
});

it("returns 502 when the email service is unreachable", async () => {
  fetchMock.mockRejectOnce(new Error("network down"));
  const res = await post(valid);
  expect(res.status).toBe(502);
});
