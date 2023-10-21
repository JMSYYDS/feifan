import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
const isEnv = process.env.NODE_ENV === "development";
// 自动加载 icons 目录下的所有svg
const req = require.context("./svg", true, /\.svg$/);
const svgNameSet = new Set();
req.keys().map(url => {
  const pathSplit = url.split("/");
  const fileName = pathSplit[pathSplit.length - 1];
  // isEnv && console.log(fileName);
  if (svgNameSet.has(fileName)) {
    // isEnv && console.error("图标名称重复，请检查");
  } else {
    svgNameSet.add(fileName);
    return req(url); // 可以用于异步require
  }
});

// 全局注册SvgIcon.vue组件
Vue.component("svg-icon", SvgIcon);
