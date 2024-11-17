/**
 * @type {import('next').NextConfig}
 */
const nextConfig= {
  reactStrictMode: true,
  basePath: '',

  sassOptions: {
    includePaths: ['./styles/**/*.scss'],
  },
  images: {
    domains: ['localhost'],
    localPatterns: [
      {
        pathname: '/img/**',
        search: ''
      }
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: "https",
        hostname: 'fsc-corp-tts.org'
      },
    ]
  }
}
module.exports = nextConfig
