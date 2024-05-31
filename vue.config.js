const { defineConfig } = require("@vue/cli-service");
const Dotenv = require("dotenv-webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      "localhost",
      "s.doonun.com",
      "www.s.doonun.com",
      "127.0.0.1",
    ],
  },
  configureWebpack: {
    plugins: [new Dotenv()],
  },
});
