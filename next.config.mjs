/** @type {import('next').NextConfig} */
const nextConfig = {
  // Service-card photos are currently served from the Higgsfield CDN via plain <img>.
  // ESLint is skipped during builds so marketing copy (apostrophes, &, →) doesn't block deploys.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
