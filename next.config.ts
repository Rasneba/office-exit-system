import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
};

export default nextConfig;
