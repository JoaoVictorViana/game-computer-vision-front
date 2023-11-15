/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/,
    })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      resourceQuery: { not: [/url/] },
      use: ['@svgr/webpack'],
    })

    // config.module.rules.unshift({
    //   test: /pdf\.worker\.(min\.)?js/,
    //   use: [
    //     {
    //       loader: "file-loader",
    //       options: {
    //         name: "[contenthash].[ext]",
    //         publicPath: "/_next/static/worker",
    //         outputPath: "/static/worker"
    //       }
    //     }
    //   ]
    // });

    return config
  },
}

module.exports = nextConfig
