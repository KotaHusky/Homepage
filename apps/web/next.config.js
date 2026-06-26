//@ts-check

const path = require('path');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'standalone',
  // Compile the source-shipped shared UI package (it ships .tsx, not built JS).
  transpilePackages: ['@kotahusky/ui'],
  // Trace files from the monorepo root so `standalone` bundles hoisted workspace
  // deps (the app lives in apps/web, deps hoist to the repo root node_modules).
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = nextConfig;
