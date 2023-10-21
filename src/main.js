import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//特殊情况下行内样式转vh
import {px2vw}from "./utils/px2vw"
import './assets/rest.css'
import "./icons/index"
Vue.config.productionTip = false
Vue.prototype.$px2vw = px2vw
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
