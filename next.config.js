/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['example.com', 'images.example.com', 'res.cloudinary.com'],
  },
};

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // eslint-disable-next-line no-undef
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
