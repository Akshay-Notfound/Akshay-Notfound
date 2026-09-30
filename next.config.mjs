/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
};

export default nextConfig;
