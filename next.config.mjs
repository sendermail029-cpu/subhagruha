/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    remotePatterns: [
      // Project photos are currently served from the existing site.
      // Before launch you can copy them to /public/images and remove this.
      { protocol: "https", hostname: "subhagruha.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  poweredByHeader: false,
  compress: true,
};
export default nextConfig;
