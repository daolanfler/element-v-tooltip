const path = require('path')

module.exports = {
  outputDir: './docs',
  publicPath: './',
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, './packages'))
  },
};
