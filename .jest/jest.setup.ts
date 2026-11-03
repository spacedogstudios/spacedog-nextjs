import { readFileSync } from "node:fs";
import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
import Database from "better-sqlite3";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// In-memory D1 seeded from the same SQL used for the local dev database.
const sqlite = new Database(":memory:");
sqlite.exec(readFileSync("src/migrations/schema.sql", "utf8"));

const mockEnv = {
  DB: new D1Database(new D1DatabaseAPI(sqlite)),
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
  MAIL_API_URL: "https://api.resend.com/emails",
  MAIL_API_KEY: "test",
  MAIL_TO: "test@example.com",
};

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => ({ env: mockEnv }),
}));
