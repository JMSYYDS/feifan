const state = {
  bottomIcon: "",
  topLine:true,
  showSilde:false,
  bottomBg:false,
  bottomBgW:false,
  swiperIndex: 0
}

const mutations =  {
     changeIcon(state, data) {
      state.bottomIcon = data
    },
    changeTopLine(state, data){
        state.topLine = data
    },
    changeSilde(state, data){
        state.showSilde = data
    },
    changeBottomBg(state, data){
        state.bottomBg = data
    },
    changeBottomBgW(state, data){
        state.bottomBgW = data
    },
    changeSwiperIndex(state, data){
      state.swiperIndex = data
    }
}

export default {
  namespaced: true,
  state,
  mutations
}