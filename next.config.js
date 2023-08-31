/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
};

module.exports = nextConfig;

// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === 'development') {
  // we import the utility from the next-dev submodule
  const { setupDevBindings } = require('@cloudflare/next-on-pages/__experimental__next-dev');

  // we call the utility with the bindings we want to have access to
  setupDevBindings({
    d1Databases: ['DB']
  });
}
