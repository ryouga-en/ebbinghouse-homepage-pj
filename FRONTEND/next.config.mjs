/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVGをReactコンポーネントとしてインポートできるようにする
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
