<template>
  <div class="charging-view" :style="{
    backgroundImage : activeIndex === 2 ? `url(${require('../../assets/images/common_bg.png')})` : ''
  }">
    <div class="header">
      <u-nav :items="navList"
             :active-index="activeIndex"
             :is-large="true"
             @item-selected="handleSelected"
             class="nav"
      ></u-nav>

      <u-property-item
          :is-info="true"
          info-content="CLTC模式:中国轻型汽车行驶工况。续航标准的最高
测试车速为114km/h，平均车速为28.96km/h，工
况较温和:
动态模式:根据用户最近的驾驶电耗计算。工况与实
际驾驶更接近"
          tip-type="bottom"
          class="right"
          v-show="activeIndex !== 2"
      >
        <template #leftContent>
          续航显示
        </template>
        <template #rightContent>
          <u-select :select-list="navSelectList" class="navList">
          </u-select>
        </template>
      </u-property-item>
    </div>

    <div class="body">
      <div class="index0" v-show="activeIndex === 0">
        <img src="../../assets/images/charging/status.png" class="status">
        <svg-icon icon-class="ic_cdian" class="ic_dian"  @click="()=>{addVisible = true}"></svg-icon>

        <div class="bottom">
          <u-button :is-clickable="true" class="small button">
            <div>充电口</div>
            <svg-icon icon-class="ic_cdko" class="ic_cdko"></svg-icon>
          </u-button>
          <u-button class="large button" @clickHandler="()=>{preVisible = true}">
            <div class="title">预约充电</div>
            <div class="button-bottom ">
              <div></div>
              <div>
                关
                <svg-icon icon-class="ic_next" class="ic_next"></svg-icon>
              </div>
            </div>
          </u-button>
          <u-button class="large button" @clickHandler="()=>{chargingVisible = true}">
            <div class="title">充电电流</div>
            <div class="button-bottom">
              <div></div>
              <div>
                8A
                <svg-icon icon-class="ic_next" class="ic_next"></svg-icon>
              </div>
            </div>
          </u-button>
          <u-button :is-clickable="true" class="small button">
            <u-property-item
                :is-info="true"
                info-content="开启电池智能加热，提升低温环境下的驾驶性能和充
电速度，同时会消耗部分电量，请基于行程及电量，
合理使用"
            >
              <template #leftContent>
                智能加热
              </template>
              <template #body>
                <div class="item-body">
                  <svg-icon icon-class="ic_znjr" class="ic_znjr"></svg-icon>
                </div>
              </template>
            </u-property-item>
          </u-button>
        </div>
      </div>
      <div class="index1" v-show="activeIndex === 1">
        <img src="../../assets/images/charging/status.png" class="status">
        <svg-icon icon-class="ic_cdian" class="ic_dian"  @click="()=>{addVisible = true}"></svg-icon>

        <div class="bottom bottom2">
          <u-button :is-clickable="true" class="small button">
            <div>放电口</div>
            <svg-icon icon-class="ic_cdko" class="ic_cdko"></svg-icon>
          </u-button>
        </div>
      </div>
      <div class="index2" v-show="activeIndex === 2">
        <div class="slide-container">
          <div class="slide-wrapper" ref="slide">
            <div class="slide-content">
              <div class="slide-page page1">
                <div class="page2-container">
                  <img src="../../assets/images/charging/monitor_bg1.png" class="bg1" v-show="currentMonitorIndex === 0">
                  <img src="../../assets/images/charging/monitor_bg2.png" class="bg1" v-show="currentMonitorIndex === 1">
                  <u-select :select-list="monitorSelectList"
                            class="selectList"
                            @choose="choose"
                  >
                  </u-select>
                </div>
              </div>
              <div class="slide-page page2">
                <div class="page2-container">
                  <img src="../../assets/images/charging/monitor_bg3.png" class="bg">
                </div>
              </div>
            </div>
          </div>

          <div class="dots-wrapper" >
            <span
                class="dot"
                v-for="(item, index) in 2"
                :key="index"
                :class="{ active: currentPageIndex === index }"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <u-dialog
        :visible="addVisible"
        title="添加充电桩"
        :hidde-bottom="true"
    >
      <div class="addContainer">
        <img src="../../assets/images/charging/addDialog.png" class="addBg">
        <div class="return" @click="()=>{addVisible = false}">

        </div>
      </div>
    </u-dialog>

    <u-dialog
        :visible="preVisible"
        confirm-context="添加"
        @cancelHandler="()=>{preVisible = false}"
    >
      <div class="preContainer">
        添加充电桩之后才可以使用预约充电功能
      </div>
    </u-dialog>

    <u-dialog
        :visible="chargingVisible"
        :show-close="true"
        :hidde-bottom="true"
        @closeHandler="()=>{chargingVisible = false}"
        title="充电电流"
    >
      <img src="../../assets/images/charging/charging.png" class="chargingBg">
    </u-dialog>
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";
import UDialog from "@/components/basic/UDialog.vue";
import BScroll, { Slide, MouseWheel } from "better-scroll";

BScroll.use(Slide);
BScroll.use(MouseWheel);

export default {
  components: {UDialog, UButton, USelect, UPropertyItem, UNav},
  name: 'ChargingView',
  data() {
    return {
      navList: [
        {text: '充电管理'},
        {text: '放电管理'},
        {text: '能量监测'},
      ],
      navSelectList: [
        {itemContent: "CLTC", isIcon: false},
        {itemContent: "动态", isIcon: false},
      ],
      monitorSelectList : [
        {itemContent: "自启动后", isIcon: false},
        {itemContent: '自充电后', isIcon: false},
      ],
      activeIndex: 0,
      addVisible : false,
      preVisible : false,
      chargingVisible : false,
      currentMonitorIndex : 0,
      currentPageIndex:0,
    };
  },

  mounted() {
    // this.init();
    this.currentPageIndex = this.activeIndex
    setTimeout(() => {
      this.init();
    }, 200);
  },

  methods: {
    handleClose() {
      this.$router.push("/home")
    },
    handleSelected(index) {
      this.activeIndex = index;
      setTimeout(() => {
        this.init();
      }, 0);
    },
    choose(index) {
      this.currentMonitorIndex = index
    },
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        click: true,
        probeType: 2,
        scrollX: true,
        scrollY: false,
        slide: {
          loop: false,
          threshold: 100,
          autoplay: false,
          startPageXIndex: this.activeIndex,
        },
        useTransition: false,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        mouseWheel: {
          speed: 2,
          invert: false,
          easeTime: 300,
        },
        quadrant: 2,
      });
      this.slide.getCurrentPage().x = -300;
      this.slide.on("scrollEnd", this._onScrollEnd);
      this.slide.on("slideWillChange", (page) => {
        this.currentPageIndex = page.pageY;
      });

      // v2.1.0
      this.slide.on("slidePageChanged", (page) => {
        if (page.pageX === 0) {
          this.per = 0;
        } else {
          this.per = 1;
        }
      });
      this.slide.on("scroll", (position) => {
        const percentage = position.x / -1201;
        if (position.x >= -1201) {
          this.per = percentage;
        }
      });
    },

    _onScrollEnd(data) {
      if (data.x < 0) {
        this.per = 1;
      }
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.$store.commit("bottom/changeSwiperIndex", pageIndex);
      this.currentPageIndex = pageIndex;
    },
  },
  //轮播图
  beforeDestroy() {
    this.slide.destroy();
  },
};
</script>

<style lang="scss" scoped>
.charging-view {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/charging/bg1.png") center no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding: 106px 84px 0 130px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;

    .right {
      width: 600px;

      .navList {
        width: 297px;
      }
    }
  }

  .body {

    .status {
      position: absolute;
      top: 263px;
      width: 408px;
    }

    .ic_dian {
      width: 75.96px;
      height: 96.34px;
      position: absolute;
      top: 220px;
      right: 84px;
    }

    .bottom {
      position: absolute;
      left: 775px;
      bottom: 160px;
      display: flex;

      .ic_cdko {
        width: 53.24px;
        height: 40.78px;
        margin-top: 32px;
      }

      .item-body {
        text-align: center;
        margin-top: 30px;
        .ic_znjr {
          width: 52.1px;
          height: 31.47px;
        }
      }


      .button {
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          width: 100%;
          text-align: left;
          margin-bottom: 32px;
        }

        .button-bottom {
          width: 100%;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .ic_next {
            width: 13.99px;
            height: 25.71px;
            margin-left: 12px;
          }
        }
      }

      .small {
        width: 280px;
        height: 170.86px;
        border-radius: 22px;
        margin-right: 80px;
      }

      .large {
        width: 339.69px;
        height: 170.86px;
        margin-right: 80px;
      }


    }

    .bottom2{
      margin-left: 667px
    }

    .index2 {

      .page1 {
        width : 100%;
        height: 100%;
        position: relative;

        .bg1 {
          width: 2293px;
          margin-top: 116px;
        }

        .selectList {
          width: 420px;
          height: 65.7px;
          position: absolute;
          top: 182px;
          left: 600px;
        }
      }

    }

  }

  .addContainer {
    position: relative;
    .addBg{
      width: 812px;
      margin-top: 48px;
    }

    .return {
      width: 372.68px;
      height: 90.62px;
      position: absolute;
      bottom: 12px;
      right: 6px;
    }
  }

  .preContainer {
    padding: 110px 120px;
  }

  .chargingBg {
    width: 795.18px;
    height: 448.4px;
    margin-top: 48px;
  }

  .page2-container {
    .bg {
      width: 2106px;
    }
  }
}

.slide-container {
  position: relative;
}

.slide-wrapper {
  min-height: 1px;
  overflow: hidden;
}

.slide-content {
  white-space: nowrap;
  transform: translateX(0px);

  .slide-page {
    display: inline-block;
    width: 100%;

    text-align: center;
    font-size: 26px;

    &.page1 {
      position: relative;
      box-sizing: border-box;
      width: 1600px;
      height: 1025px;
      z-index: 1;
    }

    &.page2 {
      box-sizing: border-box;
      padding-left: 160px;
      width: 1600px;
    }

    &.page3 {
      position: relative;
      box-sizing: border-box;
      width: 1600px;
      height: 1025px;
    }

    &.page4 {
      position: relative;
      box-sizing: border-box;
      width: 1600px;
      height: 1025px;
    }
  }
}

.dots-wrapper {
  z-index: 1;
  position: absolute;
  bottom: -48px;
  left: 50%;
  transform: translateX(-50%);

  .dot {
    display: inline-block;
    margin: 0 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;

    &.active {
      width: 48px;
      height: 12.91px;
      border-radius: 6px;
      opacity: 1;

      background: #FFFFFF;
    }
  }
}
</style>
