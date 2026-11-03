import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ["lenis"],
};

export default nextConfig;

// Makes Cloudflare bindings (D1, vars, .dev.vars secrets) available via
// getCloudflareContext() when running `next dev`.
initOpenNextCloudflareForDev();
