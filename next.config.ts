import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["secure-redirect.cloudipsp.com", "https://pay.fondy.eu", "pay.fondy.eu"],
    },
  },
};

export default withNextIntl(nextConfig);
