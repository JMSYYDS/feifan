import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import bottom from './modules/bottom'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bottom,
  },
  getters
})

export default store