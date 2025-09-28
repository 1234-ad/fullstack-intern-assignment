/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'ia.media-imdb.com'],
    unoptimized: true
  },
  env: {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
  }
}

module.exports = nextConfig