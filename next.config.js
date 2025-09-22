/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typedRoutes: false,
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com']
  }
}

module.exports = nextConfig