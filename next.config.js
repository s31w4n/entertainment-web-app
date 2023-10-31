/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_ENDPOINT: process.env.TMDB_ENDPOINT,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_IMAGE_ENDPOINT: process.env.TMDB_IMAGE_ENDPOINT,
    FIREBASE_ENDPOINT: process.env.FIREBASE_ENDPOINT,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["source.unsplash.com", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
