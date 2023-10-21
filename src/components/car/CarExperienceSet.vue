<template xmlns:u-select="http://www.w3.org/1999/html">
  <!--驾驶体验设置界面-->
  <div class="CarExperienceSet">
    <div class="operate">
      <u-nav :items=navList
             :active-index="activeNavIndex"
             @item-selected="handleSelected"
             class="nav"
      ></u-nav>

      <div class="model" v-show="activeNavIndex === 0">
        <div class="body">
          <div v-for="(item,index) in cardTextList" :key="index"
               @click="toggleHighLight(index)"
               :style="{
                    background : activeButtonIndex === index ? '#009BFC' : ''
               }"
               class="buttonCard"
          >{{ item }}
          </div>
        </div>

        <div class="session" v-show="activeButtonIndex === 0">
          <div class="title">驾驶性能设置</div>

          <div class="scroll-wrapper" ref="scroll">
            <div class="scroll-container">
              <u-property-group>
                <u-property-item>
                  <template #leftContent>
                    动力响应
                  </template>
                  <template #rightContent>
                    <u-button is-clickable class="button">自适应</u-button>
                  </template>
                  <template #body>
                    <div class="process">
                      <u-progress :width=1440></u-progress>
                    </div>
                  </template>
                </u-property-item>
              </u-property-group>
              <u-property-group
                  v-for="(group,key) in groupList" :key="key"
                  :group="group"
              >
                <template #energy>
                  <div class="process">
                    <u-progress :width=1440></u-progress>
                  </div>
                </template>
                <template #turn>
                  <u-select :select-list="[
                    {itemContent: '轻盈', isIcon: false},
                    {itemContent: '标准', isIcon: false},
                    {itemContent: '沉稳', isIcon: false},
                ]" class="select-list"></u-select>
                </template>
                <template #foot>
                  <u-select :select-list="[
                    {itemContent: '舒适', isIcon: false},
                    {itemContent: '标准', isIcon: false},
                    {itemContent: '运动', isIcon: false},
                ]" class="select-list"></u-select>
                </template>
              </u-property-group>
            </div>
          </div>
        </div>


      </div>

      <div class="control" v-show="activeNavIndex === 1">
        <u-property-group
            v-for="(group,key) in controlGroupList" :key="key"
            :group="group"
        >
        </u-property-group>
      </div>

    </div>

    <u-dialog :visible="saveVisible"
              title="已进入超级节能模式"
              @confirmHandler="()=>{saveVisible = false}"
              @cancelHandler="()=>{
                saveVisible = false
                activeButtonIndex = preButtonIndex

              }"
    >
      <div style="text-align: left">
        <p>
          请确定是否同步开启智驾低功耗模式并息灭车机屏幕?
        </p>

        <p>
          注意:智驾低功耗模式开启后，智能驾驶辅助计算平台将关闭，部分智驾功能将无法使用，请注意行驶安全。建议仅在电量较低时使用，可提升车辆续航里程。
        </p>
      </div>

    </u-dialog>

    <u-dialog :visible="modelVisible"
              class="modelDialog"
    >
      <div style="text-align: left;margin-bottom: 24px">
        暂时无法为您同步退出智驾低功耗模式，可通过无级 驾驶页面-智驾低功耗软开关手动关闭
      </div>

      <template #bottom>
        <div class="confirm-bottom" style="width: 100%">
          <u-button type="primary"
                    @clickHandler="()=>{modelVisible = false}"
                    class="button">
            确定
          </u-button>
        </div>
      </template>

    </u-dialog>

    <u-dialog :visible="stabilityVisible"
              class="modelDialog"
              is-danger
              @cancelHandler="()=>{
                controlGroupList[0].itemList[0].isSwitchOn = true
                stabilityVisible = false
              }"
    >
      <div style="margin-bottom: 12px">
        关闭动态稳定控制系统，车辆会有失稳风险

      </div>
    </u-dialog>

    <img src="../../assets/images/car/experience/bg1.png" alt="" class="bg1" v-show="activeNavIndex === 0">

    <!--轮播图-->
    <div class="broadcast" v-show="activeNavIndex === 1">
      <div class="carousel-container">
        <div class="carousel-track" ref="track">
          <div class="carousel-slide" v-for="item in 3" :key="item">
            <img v-if="item == 1" src="../../assets/images/car/outside/swiper1.png" alt="">
            <img v-if="item == 2" src="../../assets/images/car/outside/swiper2.png" alt="">
            <img v-if="item == 3" src="../../assets/images/car/outside/swiper3.png" alt="">
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <div class="broadcast-slider">
          <div v-for="(it,index) in 3" :key="index" :class="currentIndex==index?'bar-act':'bar'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UNav from "@/components/basic/UNav.vue";
import UCard from "@/components/basic/UCard.vue";
import UButtonCard from "@/components/basic/UButtonCard.vue";
import UButton from "@/components/basic/UButton.vue";
import UProgress from "@/components/basic/UProcess.vue";
import BScroll from "better-scroll";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: "CarExperienceSet",
  data() {
    return {
      navList: [
        {text: '驾驶模式'},
        {text: '制动控制'},
      ],
      activeNavIndex: 0,
      saveVisible: false,
      modelVisible: false,
      stabilityVisible: false,
      cardTextList: ['无极驾驶', '超级节能', '雪地模式'],
      activeButtonIndex: 0,
      preButtonIndex: 0,
      groupList: [
        {
          itemList: [
            {
              leftContent: "单踏板控制",
              isInfo: true,
              infoContent: '功能开启后，可以通过加速踏板进行车辆的加速、减\n' +
                  '速控制;单踏板控制受动力电池电量及环境温度的影\n' +
                  '响，制动减速效果有所差异，请根据车辆实际制动效\n' +
                  '果对车辆进行准确的加速、制动控制',
              isDisabled: false,
              model: 'select',
              switchData: (isSwitchOn) => {
                this.subVisible = !this.subVisible;
              }
            }
          ],
        },
        {
          itemList: [
            {
              id: "energy",
              leftContent: "滑行能量回收",
              infoContent: '车辆滑行时，可以将车辆部分动能转化为电能，给动力电池充电提升续航里程',
              isInfo: true,
              isDisabled: false,
            }
          ],
        },
        {
          itemList: [
            {
              id: 'turn',
              leftContent: "转向手感",
            }
          ],
        },
        {
          itemList: [
            {
              id: 'foot',
              leftContent: "制动脚感",
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "智能低功耗模式",
              infoContent: '低功耗模式开启后，“行车影像、驾驶行为监控\n' +
                  '变道辅助、智能领航辅助、360全景辅助、自动泊\n' +
                  '车、遥控泊车”功能将受到影响无法使用',
              isInfo: true,
              isDisabled: false,
              isSwitchOn: true,
              model: 'select',
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "智能超速报警",
              infoContent: '功能开启后，车辆将智能识别道路限速标志，超速时自动发出警示',
              isInfo: true,
              isSwitchOn: true,
              model: 'select',
            }
          ],
        },

      ],
      controlGroupList: [
        {
          itemList: [
            {
              leftContent: "动态稳定控制系统",
              infoContent: '关闭动态稳定控制系统以后系统不对车辆的驾驶行为\n' +
                  '以及姿态进行控制，在激烈驾驶时车辆会存在失控的\n' +
                  '风险，请谨慎关闭',
              tipType: 'bottom',
              isInfo: true,
              isSwitchOn: true,
              isChangeable : false,
              model: 'select',
              switchData:(data) => {
                this.stabilityVisible = true
                this.controlGroupList[0].itemList[0].isSwitchOn = true
              }
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "自动驻车",
              infoContent: '自动驻车可在汽车停车时自动保持车辆处于刹车状\n' +
                  '态，当驾驶者在等红绿灯或上坡起步时不需要一直脚\n' +
                  '踩刹车或使用手刹，便能保持车辆静止，避免溜车;\n' +
                  '当单踏板控制功能激活时，即使关闭自动驻车功能\n' +
                  '当车辆静止时依然会主动提供刹车力保持车辆静止',
              isInfo: true,
              isSwitchOn: true,

              model: 'select'
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "陡坡缓降",
              infoContent: '陡坡缓降使驾驶员能专注控制方向盘，在不踩制动踏\n' +
                  '板、车辆完全受系统控制情况下，保证车辆平稳安全\n' +
                  '地通过陡峭的下坡坡段，从容下坡',
              isInfo: true,
              isSwitchOn: true,
              model: 'select'
            },
          ]
        },
      ],
      currentIndex: 0, // 当前显示的图片索引
      startX: 0,
      endX: 0,
      threshold: 50 // 滑动阈值，超过这个值才触发切换
    };
  },
  components: {
    UDialog,
    UProgress,
    UButton,
    UButtonCard,
    UCard,
    UNav,
    USelect,
    UPropertyItem,
    UPropertyGroup,
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        quadrant: 2,
        click: true
      })
    },
    handleSelected(index) {
      this.activeNavIndex = index
      setTimeout(() => {
        this.bs.refresh()
      }, 200)
    },
    toggleHighLight(index) {

      if (this.activeButtonIndex == index) {
        return
      }
      this.preButtonIndex = this.activeButtonIndex
      this.activeButtonIndex = index
      if (index === 1) {
        this.saveVisible = true
      }
      if (index === 2) {
        this.modelVisible = true
      }
    },
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
      // this.endX = event.touches[0].clientX;
    },
    handleTouchEnd(event) {
      this.endY = event.changedTouches[0].clientY;
      const diffX = this.startY - this.endY;
      if (diffX > this.threshold) {
        // 向左滑动，切换到下一张图片
        this.nextSlide();
      } else if (diffX < -this.threshold) {
        // 向右滑动，切换到上一张图片
        this.prevSlide();
      }
    },
    nextSlide() {
      if (this.currentIndex < 2) {
        this.currentIndex++;
      } else {
        // this.currentIndex = 0;
      }
      this.updateCarousel();
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        // this.currentIndex = 2;
      }
      this.updateCarousel();
    },
    updateCarousel() {
      const track = this.$refs.track;
      const newPosition = -this.currentIndex * 100 + '%';
      track.style.transform = `translateX(${newPosition})`;
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 200);
    const track = this.$refs.track;
    track.addEventListener('touchstart', this.handleTouchStart);
    track.addEventListener('touchmove', this.handleTouchMove);
    track.addEventListener('touchend', this.handleTouchEnd);
  }
};
</script>
<style scoped lang="scss">
.CarExperienceSet {
  width: 100%;
  height: 100%;
  padding: 65px 84px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  position: relative;

  .process {
    margin-top: 12px;
  }

  .select-list {
    margin-top: 29px;
  }

  .bg1 {
    position: absolute;
    width: 930.61px;
    height: 480.95px;
    top: 402px;
    left: 1127px;
    z-index: -1;
  }

  .nav {
    margin-bottom: 86px;
  }

  .operate {
    width: 50%;
    height: 100%;

    .model {
      height: 100%;

      .session {
        height: 65%;
      }

      .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 78px;

        .buttonCard {
          width: 253.74px;
          height: 139.32px;
          background: rgba($color: #fff, $alpha: 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          //margin: 27px; /* 添加间隔，这里设置为5px */
          border-radius: 24px;
          font-size: 32px;
        }

      }

      .title {
        font-size: 34px;
        font-weight: 500;
        line-height: 51px;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 35px;
      }

      .button {
        width: 226.55px;
        height: 77px;
        background-color: rgba($color: #D8D8D8, $alpha: 0.3);

      }

    }

  }

  .modelList {
    display: flex;

    .model-item {
      width: 33%;
      padding: 0 4px;

      .cover {
        width: 100%;
      }
    }
  }
}


.broadcast {
  width: 640px;
  height: 960px;
  position: absolute;
  top: 240px;
  right: 180px;

  .carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.3s ease;
  }

  .carousel-slide {
    flex: 0 0 100%;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .slide-image {
    width: 100%;
    height: auto;
  }

  .broadcast-slider {
    position: absolute;
    bottom: 0;
    // background-color: rgb(234, 109, 49,0.4);
    width: 120px;
    height: 17.32px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    align-items: center;

    .bar-act {
      width: 40px;
      height: 14px;
      border-radius: 50px;
      background: white;
    }

    .bar {
      width: 14.21px;
      height: 14.21px;
      border-radius: 50%;
      background: #94918B;
    }
  }
}

.scroll-wrapper {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;

  .scroll-container {
    height: 180%;
    //margin-top: 86px;
  }
}

</style>
