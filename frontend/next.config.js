/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure async/await in the Edge Runtime
  experimental: {
    serverComponentsExternalPackages: ['bcrypt'],
  },
}

module.exports = nextConfig
