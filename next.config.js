module.exports = {
  reactStrictMode: true,
  webpack(config, { webpack }) {
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
        HTTP_ONLY: process.env.NODE_ENV === "production" ? "true" : "false",
        COOKIE_PAGE_SIZE: JSON.parse(process.env.COOKIE_PAGE_SIZE),
        VERSION: JSON.stringify(process.env.VERSION),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        EXTENSION_ID: JSON.stringify(process.env.EXTENSION_ID),
        NOTICE_URL: JSON.stringify(process.env.NOTICE_URL)
      }),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
    );

    return config;
  },

  env: {
    NOTICE_URL: process.env.NOTICE_URL,
    DOMAIN: process.env.DOMAIN,
    DEV_DOMAIN: process.env.DEV_DOMAIN,
    API_URL: process.env.API_URL,
    DEV_API_URL: process.env.DEV_API_URL,
    EXPIRE_YEAR: process.env.EXPIRE_YEAR,
    COOKIE_PAGE_SIZE: process.env.COOKIE_PAGE_SIZE,
    VERSION:process.env.VERSION,
    CLIENT_ID: process.env.CLIENT_ID,
    EXTENSION_ID:process.env.EXTENSION_ID
  },
};
