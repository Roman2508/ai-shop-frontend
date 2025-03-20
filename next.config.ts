import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')

const nextConfig: NextConfig = {
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
}

export default withNextIntl(nextConfig)
