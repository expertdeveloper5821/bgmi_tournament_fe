/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    REACT_APP_BASE_URL: 'http://localhost:5000/v1/',
    REACT_APP_GOOGLE_AUTH_URL: 'http://localhost:5000/auth/google',
  },
};

module.exports = nextConfig;
