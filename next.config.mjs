/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.media-amazon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
