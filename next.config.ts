/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forces Next.js to ignore these packages during compilation tracing
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  
  // Prevents Next.js lint or typescript errors from stopping production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;