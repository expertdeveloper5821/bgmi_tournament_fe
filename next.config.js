/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
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

module.exports = nextConfig;
