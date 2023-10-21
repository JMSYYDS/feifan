const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const name ='qiche' // page title
// 引入path模块
const resolve = dir => path.join(__dirname, dir);
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  lintOnSave: false,//取消eslint设置
  chainWebpack: config => {
    // vue inspect --rule svg  // 使用以上指令，可以获取vue配置的loader规则
    // svg loader 取消src/icons目录下的处理
    config.module.rule("svg").exclude.add(resolve("src/icons"));
    // 添加自定义loader规则 icons，只处理src/icons目录
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) // 上下文变化
      .end() // 返回上下文
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
  // devServer: {
  //   host: "192.168.229.1",
  //   port: "8081"
  // }
});
