/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Leaflet double render issue fix
  
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig