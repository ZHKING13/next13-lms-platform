/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['resend'],
    },
}

module.exports = nextConfig