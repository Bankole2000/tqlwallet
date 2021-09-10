module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "TQL Demo Wallet app";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/tqlwallet/" : "/"
  // publicPath: '',
  // baseUrl: '/projects/vue/webpieces/dist/',
};
