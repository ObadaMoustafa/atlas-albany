const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = withNextIntl(nextConfig)
