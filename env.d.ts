// Bindings and secrets available via getCloudflareContext().env.
// Vars come from wrangler.jsonc; secrets from the Worker's settings
// (production) or .dev.vars (local).
interface CloudflareEnv {
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
  DB: D1Database;
  CONTACT_RATE_LIMITER: RateLimit;
  MAIL_API_URL: string;
  MAIL_API_KEY: string;
  MAIL_TO: string;
}
