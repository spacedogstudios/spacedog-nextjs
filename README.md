Code for [https://spacedog.com.au](https://spacedog.com.au) website.

Next.js on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare), with page content in Cloudflare D1 and the contact form sent through Resend.

## Requirements

- Node 26 (see `.nvmrc`)
- [Bun](https://bun.sh)

## Local development

```bash
bun install
cp .dev.vars.example .dev.vars   # then fill in MAIL_API_KEY and MAIL_TO
bun run db:local                 # create/reset the local D1 database
bun run dev                      # http://localhost:3000
```

`bun run dev` is the normal Next.js dev server with hot reload. Cloudflare bindings (the D1 database, vars and `.dev.vars` secrets) are wired in via `initOpenNextCloudflareForDev()` in `next.config.ts`, so it uses the local D1 database, not production.

To run the production build inside Cloudflare's runtime (workerd) before pushing:

```bash
bun run preview                  # http://localhost:8787
```

### Testing the contact form locally

- **Success:** use a real Resend API key in `.dev.vars`. Emails are really sent, to `MAIL_TO`.
- **Error notification:** set `MAIL_API_KEY=invalid` in `.dev.vars`. Resend rejects it and the form shows the error toast; the reason is logged in the terminal.

### Local database

`bun run db:local` drops and recreates the local `content` table from `src/migrations/schema.sql`. The data lives in `.wrangler/` (git-ignored) and is separate from production.

## Editing content

Page text lives in the production D1 database `spacedog` (table `content`, markdown in `body`). To change it, run SQL against it, e.g. `bunx wrangler d1 execute spacedog --remote --command "UPDATE content SET tagline = '...' WHERE route_id = 'about'"` (needs `wrangler login`).

The site caches this content at each Cloudflare location for up to an hour (`src/lib/getContentRows.ts`), so edits appear within the hour. To see them immediately, purge the cache in the Cloudflare dashboard: `spacedog.com.au` → Caching → Configuration → Purge Cache → Custom Purge → URL `https://spacedog.com.au/_cache/content`.

## Images

The hero background is served as pre-sized WebP files with a JPEG fallback from `public/images/`. If you replace it, regenerate the 1280/1920/2560px WebP files and the 1920px JPEG (e.g. with `sharp`).

## Checks

```bash
bun run test
bun run lint
bun run typecheck
```

These also run on staged files via the husky pre-commit hook.

## Deployment

Pushes are built and deployed by Cloudflare Workers Builds, connected to this GitHub repo:

- `main` → production (`bunx opennextjs-cloudflare deploy`)
- other branches → a preview version with its own URL (`bunx opennextjs-cloudflare upload`)

Secrets (`MAIL_API_KEY`, `MAIL_TO`) are set on the `spacedog` Worker in the Cloudflare dashboard, or with `bunx wrangler secret put <NAME>`.
