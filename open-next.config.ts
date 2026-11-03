import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The homepage reads from D1 on every request, so no incremental cache is needed.
export default defineCloudflareConfig({});
