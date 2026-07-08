/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
