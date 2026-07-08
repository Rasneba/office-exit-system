/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
