<template>
  <div class="scene-view">
    <div class="main">
      <div class="header">
        <u-nav :items="[{text:'我的场景'}]" :is-large="true" :active-index="0"></u-nav>
        <u-button type="primary" class="button" @clickHandler="()=>{currentPageIndex = 4}">创建场景</u-button>
      </div>

      <div class="body">
        <div class="row">
          <img src="../../assets/images/scene/img1.png" class="card" @click="changeIndex(0)">
          <img src="../../assets/images/scene/img2.png" class="card" @click="changeIndex(1)">
          <img src="../../assets/images/scene/img3.png" class="card" @click="changeIndex(2)">
        </div>
        <div class="row">
          <img src="../../assets/images/scene/img4.png" class="card" @click="changeIndex(3)">
        </div>
      </div>
    </div>

    <div class="img-container" v-show="currentPageIndex !== -1">
      <div class="innerContainer">
        <img src="../../assets/images/scene/bg1.png" alt="" class="bg" v-show="currentPageIndex === 0">
        <div class="bg-close close1" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 0">

        </div>
        <img src="../../assets/images/scene/bg2.png" alt="" class="bg" v-show="currentPageIndex === 1">
        <div class="bg-close close2" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 1">

        </div>
        <img src="../../assets/images/scene/bg3.png" alt="" class="bg" v-show="currentPageIndex === 2">
        <div class="bg-close close3" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 2">

        </div>
        <img src="../../assets/images/scene/bg4.png" alt="" class="bg" v-show="currentPageIndex === 3">
        <div class="bg-close close4" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 3">

        </div>
        <img src="../../assets/images/scene/bg5.png" alt="" class="bg" v-show="currentPageIndex === 4">
        <div class="bg-close close5" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 4">

        </div>
        <div class="bg-close button" @click="()=>{currentPageIndex = 5}" v-show="currentPageIndex === 4"></div>
        <img src="../../assets/images/scene/bg6.png" alt="" class="bg" v-show="currentPageIndex === 5">
        <div class="bg-close close6" @click="()=>{currentPageIndex = -1}" v-show="currentPageIndex === 5">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";

export default {
  name: 'SceneView',
  components: {UButton, USelect, UPropertyGroup, UPropertyItem, UNav},

  data() {
    return {
      currentPageIndex : -1,
    };
  },

  mounted() {

  },

  methods: {
    changeIndex(index) {
      this.currentPageIndex = index
    }
  },
};
</script>

<style lang="scss" scoped>
.scene-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/common_bg.png");
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 150px 196px;

  .main {

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .button {
        width: 250px;
        height: 80px;
        border-radius: 24px;
        opacity: 1;
        font-size: 30px;
        font-weight: normal;
        line-height: 38px;
        letter-spacing: -0.02em;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
        background: #009DFF;
      }
    }

    .body {

      .row {
        display: flex;
        align-items: center;

        .card {
          width: 674.98px;
          height: 373.66px;
          margin-right: 72px;
          margin-top: 66px;
        }
      }

    }
  }

  .img-container {
    width: 100%;
    height: 100%;
    position:absolute ;
    top: 0;
    left: 0;
    z-index: 7;

    .innerContainer {
      position: relative;
      width: 100%;
      height: 100%;

      .bg {
        width: 100%;
        height: 100%;
      }

      .bg-close {
        position: absolute;
      }

      .close1 {
        top: 200px;
        left: 140px;
        width: 60px;
        height: 60px;
      }

      .close2 {
        width: 206px;
        height: 96px;
        top: 130px;
        left: 96px;
      }

      .close3 {
        width: 206px;
        height: 96px;
        top: 60px;
        left: 96px;
      }

      .close4 {
        width: 206px;
        height: 96px;
        top: 60px;
        left: 96px;
      }

      .close5 {
        width: 64px;
        height: 64px;
        top: 200px;
        left: 134px;
      }

      .close6 {
        width: 64px;
        height: 64px;
        top: 200px;
        left: 134px;
      }

      .button {
        left: 1164.46px;
        top: 615.56px;
        width: 400.94px;
        height: 94.04px;
      }

    }
  }
}
</style>
