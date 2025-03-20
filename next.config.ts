import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: [
        // "https://pay.fondy.eu",
        // "pay.fondy.eu",
        // "https://7edf-2a02-2378-1284-85-7d89-eb06-d310-3600.ngrok-free.app",
        // "7edf-2a02-2378-1284-85-7d89-eb06-d310-3600.ngrok-free.app",
        // "http://localhost:7777",
        // "localhost:7777",
        // "http://localhost:3000",
        // "localhost:3000",
        "secure-redirect.cloudipsp.com",
      ],
    },
  },
  //   async rewrites() {
  //     return [
  //       {
  //         source: '/catalog',
  //         destination: 'https://9e68-109-251-250-156.ngrok-free.app/thank-you',
  //       },
  //     ]
  //   },
  //   async headers() {
  //     return [
  //       {
  //         source: '/(.*)',
  //         headers: [
  //           { key: 'Access-Control-Allow-Origin', value: '*' },
  //           { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
  //           { key: 'Access-Control-Allow-Headers', value: 'Content-Type, X-Forwarded-Host' },
  //         ],
  //       },
  //     ]
  //   },
};

export default withNextIntl(nextConfig);
