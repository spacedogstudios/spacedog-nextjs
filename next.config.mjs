import { setupDevBindings } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/8e93067/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevBindings({
    bindings: {
      DB: {
        type: 'd1',
        databaseId: 'DB',
      }
    }
  });
}

export default nextConfig;
