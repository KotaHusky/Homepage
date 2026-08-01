//@ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: ['@kotahusky/ui'],
};

module.exports = nextConfig;
