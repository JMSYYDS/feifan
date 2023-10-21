<template>
  <div class="home_page_view_container">
    <div class="ic_jia_box" @click="handleJia">
      <svg-icon iconClass="ic_jia" class="ic_jia"></svg-icon>
    </div>
    <div class="bizhi_model" :class="isBizhiModel?'bizhi_model_active':''">
      <img src="../../assets/images/home/bizhi.png">
    </div>

    <div class="homepage-dropdown" @touchstart="handleTouchStart" @touchmove="handleTouchMove"></div>

    <div class="slide-container">
      <div class="slide-wrapper" ref="slide">
        <div class="slide-content">
          <div class="slide-page page1">
            <div class="menu_icon_box">
              <div v-for="item in menuIconList" :key="item.iconName" class="menu_icon_item"
                   @click="handleIcon(item.url)">
                <svg-icon :iconClass="item.iconName" :class="item.iconName" class="menu_icon"></svg-icon>
                <div class="icon_text">{{ item.text }}</div>
              </div>
            </div>
          </div>
          <div class="slide-page page2">
            <div class="menu_icon_box sub_menu_icon_box">
              <div v-for="item in subMenuIconList" :key="item.iconName" class="menu_icon_item"
                   @click="handleIcon(item.url)">
                <svg-icon :iconClass="item.iconName" :class="item.iconName" class="menu_icon"></svg-icon>
                <div class="icon_text">{{ item.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dots-wrapper">
            <span
                class="dot"
                v-for="(item, index) in 2"
                :key="index"
                :class="{ active: currentPageIndex === index }"
            ></span>
      </div>
    </div>

  </div>
</template>

<script>
import USelect from "@/components/basic/USelect.vue";
import BScroll, {Slide, MouseWheel} from "better-scroll";
import {mapState} from "vuex";

BScroll.use(Slide);
BScroll.use(MouseWheel);

export default {
  components: {USelect},
  name: 'QicheCliHomePageView',

  data() {
    return {
      menuIconList: [
        {
          iconName: "ic_baidumap",
          text: "地图导航",
          url: '/home/map',
        },
        {
          iconName: "ic_media",
          text: "媒体中心",
          url: '/home/music',
        },
        {
          iconName: "ic_energy",
          text: "能量管理",
          url: '/home/charging',
        },
        {
          iconName: "ic_phone",
          text: "蓝牙电话",
          url: '/home/phone',
        },
        {
          iconName: "ic_360",
          text: "360",
          url: '/home/around',
        },
        {
          iconName: "ic_3601",
          text: "行车影像",
          url: '/home/camera',
        },
        {
          iconName: "ic_IQIYI",
          text: "爱奇艺",
          url: '/home/aqy'
        },
        {
          iconName: "ic_ai",
          text: "智能场景",
          url :'/home/scene'
        },
      ],
      subMenuIconList :[
        {
          iconName: "ic_huoshan",
          text: "火山车娱",
          url: '/home/huoshan',
        },
        {
          iconName: "ic_personage",
          text: "个人中心",
          url: '/home/user',
        },
        {
          iconName: "ic_kuaiyou",
          text: "咪咕快游",
          url: '/home/kuaiyou',
        },
        {
          iconName: "ic_boche",
          text: "自动泊车",
          url: '/home/park',
        },
        {
          iconName: "ic_anquan",
          text: "儿童安全座",
          url: '/home/safe',
        },
      ],
      isBizhiModel: false,
      currentPageIndex: 0,
      per: 0,
      slide: null,
      startPageY: 0
    };
  },
  methods: {
    handleJia() {
      this.isBizhiModel = !this.isBizhiModel
    },
    handleIcon(url) {
      if (url) this.$router.push(url)
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
          startPageXIndex: this.swiperIndex,
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

      // console.log(this.slide)
    },

    _onScrollEnd(data) {
      if (data.x < 0) {
        this.per = 1;
      }
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.$store.commit("bottom/changeSwiperIndex", pageIndex);
      this.currentPageIndex = pageIndex;
    },
    handleTouchStart(e) {
      // console.log("aaaa");
      this.startPageY = e.touches[0].pageY
    },
    handleTouchMove(e) {
      if (this.startPageY - e.changedTouches[0].pageY != 0) {
        this.$router.push("/dropdown")
      }
    },
  },
  mounted() {
    this.currentPageIndex = this.swiperIndex
    setTimeout(() => {
      this.init();
    }, 100);
  },
  computed: {
    ...mapState("bottom", {
      swiperIndex: (state) => state.swiperIndex,
    }),
  },
  beforeDestroy() {
    this.slide.destroy();
  },
};
</script>

<style lang="scss" scoped>
.home_page_view_container {
  width: 100%;
  height: 100%;
  // position: relative;
  .ic_jia_box {
    position: absolute;
    top: 146px;
    right: 100px;
    z-index: 1;
    .ic_jia {
      width: 100.67px;
      height: 100.34px;
    }
  }

  .bizhi_model {
    position: absolute;
    top: 283px;
    right: 100px;
    width: 312.65px;
    height: 277.86px;
    transition: all .4s;
    opacity: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .bizhi_model_active {
    opacity: 1;
  }

  .menu_icon_box {
    width: 2260px;
    position: absolute;
    top: 1094px;
    //padding: 0 100px 0 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .menu_icon_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .menu_icon {
        width: 104px;
        height: 104px;
      }

      // .ic_baidumap{
      //     margin-left: 100px;
      // }
      // .ic_ai{
      //     margin-right: 100px;
      // }
      .icon_text {
        margin-top: 30px;
        color: white;
      }
    }
  }

  .sub_menu_icon_box {
    justify-content: start;

    .menu_icon_item {
      margin:0 72px;
    }
  }

  .home-swiper-btn {
    position: absolute;
    top: 1355px;
    left: 1227px;

    .ic_swiper_btn {
      width: 102.76px;
      height: 12.16px;
    }
  }
  .homepage-dropdown{
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 200px;
  }
}

.slide-container {
  position: relative;
  height: 100%;
  z-index: 0;
}

.slide-wrapper {
  height: 100%;
  width: calc(100% - 310px);
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}

.slide-content {
  white-space: nowrap;
  height: 100%;
  font-size: 0;
  transform: translateX(0px) translateY(0px) translateZ(1px);

  .slide-page {
    display: inline-block;
    height: 100%;
    width: 100%;

    text-align: center;
    font-size: 26px;

    .page1 {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .page2 {
      box-sizing: border-box;
      padding-left: 160px;
      width: 100%;
      height: 100%;
    }
  }
}

.dots-wrapper {
  z-index: 1;
  position: absolute;
  bottom: 48px;
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
