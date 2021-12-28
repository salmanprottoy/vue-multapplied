module.exports = {
  devServer: {
    proxy: {
      "/api/v4/private_wan_routers/": {
        target: "https://ba-dev.turnium.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
