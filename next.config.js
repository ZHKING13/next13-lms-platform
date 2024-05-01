/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['resend'],
  },
}

module.exports = nextConfig
