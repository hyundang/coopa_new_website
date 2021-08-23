module.exports = {
  reactStrictMode: true,
  webpack(config, { dev, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: { removeViewBox: false } },
          },
        },
        "url-loader",
      ],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        DOMAIN:
          process.env.NODE_ENV === "production"
            ? JSON.stringify(process.env.DOMAIN)
            : JSON.stringify(process.env.DEV_DOMAIN),
        API_DOMAIN:
          process.env.NODE_ENV === "production"
            ? JSON.stringify(process.env.API_URL)
            : JSON.stringify(process.env.DEV_API_URL),
      }),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
    );

    return config;
  },
  
  env: {
    NOTICE_URL: process.env.NOTICE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    API_URL: process.env.API_URL,
    DEV_API_URL: process.env.DEV_API_URL,
  },
};
