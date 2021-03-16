module.exports = {
  publicRuntimeConfig: {
    GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
    INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  },
  compress: false,
  poweredByHeader: false,
  // Make auto redirect to artist page when use open the first page temporarily because we dont have design yet
  async redirects() {
    return [
      {
        source: "/",
        destination: "/artists",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/artists",
        permanent: true,
      },
    ];
  },
};
