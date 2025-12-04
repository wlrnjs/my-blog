/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/blog" : "", // GitHub 저장소 이름
  assetPrefix: process.env.NODE_ENV === "production" ? "/blog/" : "", // GitHub 저장소 이름
};

module.exports = nextConfig;
