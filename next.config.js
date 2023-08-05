/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    REACT_APP_BASE_URL: "http://localhost:5000/",
  }
};

module.exports = nextConfig;
