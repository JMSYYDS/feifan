<template>
  <!--车外设置界面-->
  <div class="outside">
    <u-nav :items=navList
           :active-index="activeNavIndex"
           @item-selected="handleSelected"
           margin-right="18px"
           class="nav"
    ></u-nav>
    <div class="scroll-wrapper" ref="scroll">
      <div class="operate">

        <!--车外灯-->
        <div class="lamp" v-if="activeNavIndex === 0">
          <div class="header">
            <u-button class="card-button" is-clickable>
              <svg-icon icon-class="ic_back_lamp" class="ic_back_lamp">

              </svg-icon>
              <div class="name">
                后雾灯
              </div>
            </u-button>
            <img src="../../assets/images/car/outside/warn.png" alt="" class="warning" v-show="outsideSelectIndex <= 1">
          </div>

          <u-property-group>
            <u-property-item>
              <template #leftContent>
                <div class="outside-lamp">
                  外部车灯
                  <svg-icon icon-class="ic_outside_lamp" class="ic_outside_lamp"></svg-icon>
                </div>
              </template>
              <template #body>
                <u-select :select-list="outsideSelectList" class="selectList" @choose="chooseOutside"
                          :current-index=outsideSelectIndex>
                </u-select>
              </template>
            </u-property-item>

          </u-property-group>
          <u-property-group
              v-for="(group,key) in lampGroupList" :key="key"
              :title="group.title"
              :group="group"
          >

            <template #scene>
              <div class="scene">
                <div class="header">
                  <div class="left">
                    <div class="left-top">
                      场景灯语
                      <u-tip content="车辆外灯可在不同场景（如打招呼，靠近车辆，离车，充电、放点、寻车）下显示相应的灯光效果">
                        <svg-icon icon-class="user_info"></svg-icon>
                      </u-tip>
                    </div>
                    <div class="desc">P档下可点击预览灯语</div>
                  </div>
                  <div class="right" @click="()=>{dengyuVisible = true}">
                    ...
                  </div>
                </div>

                <div class="body">
                  <u-card v-for="(item,index) in carTextList" :key="index"
                          :card-height=165
                          :card-width=275
                          :is-high-lighted="activeButtonIndex === index"
                          @toggle="toggleHighLight(index)"
                          class="buttonCard"
                  >{{ item }}
                  </u-card>
                </div>
              </div>
            </template>
          </u-property-group>

        </div>

        <!--后视镜-->
        <div class="back" style="width: 50%;" v-if="activeNavIndex === 1">
          <div class="button-car-list">
            <img src="../../assets/images/car/outside/expand_back.png" alt="" class="ic_back_lamp">
            <img src="../../assets/images/car/outside/zhedie_back.png" alt="" class="ic_back_lamp">
            <img src="../../assets/images/car/outside/adjust_back.png" alt="" class="ic_back_lamp"
                 @click="()=>{adjustVisible = true}">
          </div>

          <u-property-group
              v-for="(group,key) in backGroupList" :key="key"
              :title="group.title"
              :group="group"
          >
          </u-property-group>

        </div>

        <!--雨刮-->
        <div class="wiper" style="width: 50%;" v-if="activeNavIndex === 2">

          <u-property-group
              v-for="(group,key) in wiperGroupList" :key="key"
              :title="group.title"
              :group="group"
          >
            <template #autoWiper>
              <u-select
                  :select-list="wiperSelectList"
                  class="selectList"
              ></u-select>
            </template>
          </u-property-group>

        </div>

        <!--门锁-->
        <div class="door" v-if="activeNavIndex === 3">
          <div class="button-car-list">
            <u-button class="card-button" is-clickable @clickHandler="clickLockHandler1">
              <svg-icon icon-class="ic_left_child" class="ic_left_child">

              </svg-icon>
              <div class="name">
                左侧儿童锁
              </div>
            </u-button>
            <u-button class="card-button" is-clickable @clickHandler="clickLockHandler2">
              <svg-icon icon-class="ic_right_child" class="ic_right_child">

              </svg-icon>
              <div class="name">
                右侧儿童锁
              </div>
            </u-button>
            <u-button class="card-button" is-clickable>
              <svg-icon icon-class="ic_middle_lock" class="ic_middle_lock">

              </svg-icon>
              <div class="name">
                中控锁
              </div>
            </u-button>
          </div>

          <u-property-group
              v-for="(group,key) in doorGroupList" :key="key"
              :title="group.title"
              :group="group"
          >
            <template #feedBack>
              <u-select
                  :select-list="feedBackSelectList"
                  class="selectList"
              ></u-select>
            </template>
          </u-property-group>

        </div>

        <!--车窗-->
        <div class="wind" v-if="activeNavIndex === 4">
          <div class="button-car-list col">
            <u-button class="card-button" @clickHandler="()=>{isWholeClose = true}">
              <svg-icon icon-class="ic_whole_open" class="ic_whole_open">

              </svg-icon>
              <div class="name">
                全关
              </div>
            </u-button>
            <u-button class="card-button" @clickHandler="()=>{isWholeClose = false}">
              <svg-icon icon-class="ic_whole_close" class="ic_whole_open">

              </svg-icon>
              <div class="name">
                全开
              </div>
            </u-button>
            <u-button class="card-button" @clickHandler="()=>{isWholeClose = true}">
              <svg-icon icon-class="ic_tongfeng" class="ic_whole_open">

              </svg-icon>
              <div class="name">
                通风
              </div>
            </u-button>
          </div>

        </div>

        <!--电动尾门-->
        <div style="display: flex;justify-content: space-between;align-items: center;" v-if="activeNavIndex === 5">
          <div class="tail">
            <u-button class="card-button" is-clickable>
              <svg-icon icon-class="ic_weimen" class="ic_back_lamp">

              </svg-icon>
              <div class="name">
                电动尾门
              </div>
            </u-button>

            <u-property-group
                v-for="(group,key) in tailGroupList" :key="key"
                :title="group.title"
                :group="group"
            >
              <template #tail>
                <div class="desc">
                  请选择适合你的尾门开度
                </div>

                <div class="process-container">
                  <div class="top">
                    <div class="process">
                      <ul>
                        <li v-for="index in 7"
                            :key="index"
                            @click="clickProcess(index-1)"

                            :class="openIndex === (index-1) || index === 1 || index === 7?'process-li':''"
                        ></li>
                      </ul>
                      <div class="currentProcess"
                          :style="{
                      width: openIndex / 6 * 100 + '%'
                      }"
                      >
                        <div class="current"
                            :style="{
                          left : openIndex / 6 * 100 + '%',
                          backgroundColor : openIndex === 0 ? '#000' : '#006AC8'
                        }"
                        >
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="value"
                      :style="{
                          marginLeft : openIndex / 6 * 100 + '%',
                        }"
                  >
                    {{ openIndex + 4 + "0%" }}
                  </div>
                </div>
              </template>
            </u-property-group>

          </div>
<!--          <div class="chewei-img">-->
<!--            <img v-if="cheweiIndex == 6" src="../../assets/images/car/outside/chewei2.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 5" src="../../assets/images/car/outside/chewei3.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 4" src="../../assets/images/car/outside/chewei4.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 3" src="../../assets/images/car/outside/chewei5.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 2" src="../../assets/images/car/outside/chewei6.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 1" src="../../assets/images/car/outside/chewei7.png" alt="">-->
<!--            <img v-else-if="cheweiIndex == 0" src="../../assets/images/car/outside/chewei8.png" alt="">-->
<!--            <img v-else src="../../assets/images/car/outside/chewei1.png" alt="">-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <div class="chewei-img" v-if="activeNavIndex === 5">
      <img v-if="cheweiIndex == 6" src="../../assets/images/car/outside/chewei2.png" alt="">
      <img v-else-if="cheweiIndex == 5" src="../../assets/images/car/outside/chewei3.png" alt="">
      <img v-else-if="cheweiIndex == 4" src="../../assets/images/car/outside/chewei4.png" alt="">
      <img v-else-if="cheweiIndex == 3" src="../../assets/images/car/outside/chewei5.png" alt="">
      <img v-else-if="cheweiIndex == 2" src="../../assets/images/car/outside/chewei6.png" alt="">
      <img v-else-if="cheweiIndex == 1" src="../../assets/images/car/outside/chewei7.png" alt="">
      <img v-else-if="cheweiIndex == 0" src="../../assets/images/car/outside/chewei8.png" alt="">
      <img v-else src="../../assets/images/car/outside/chewei1.png" alt="">
    </div>

    <img src="../../assets/images/car/car.png" alt="" class="bg"
         v-if="activeNavIndex === 0 || activeNavIndex === 1 || activeNavIndex === 3">
    <img src="../../assets/images/car/front_bg.png" class="front-bg" v-if="activeNavIndex === 2" alt="">

    <div class="img-container" v-show="activeNavIndex === 3">
      <div class="inner-container">
        <img src="../../assets/images/car/outside/left_lock_dark.png" class="lock_img left_lock_dark"
             v-show="lockVisibleIndex === 0" alt="">
        <img src="../../assets/images/car/outside/left_lock_light.png" class="lock_img left_lock_light"
             v-show="lockVisibleIndex === 1" alt="">
        <img src="../../assets/images/car/outside/right_lock_dark.png" class="lock_img right_lock_dark"
             v-show="lockVisibleIndex === 2" alt="">
        <img src="../../assets/images/car/outside/right_lock_light.png" class="lock_img right_lock_light"
             v-show="lockVisibleIndex === 3" alt="">
      </div>
    </div>

    <img src="../../assets/images/car/whole_close.png" class="wind_bg_close" v-if="activeNavIndex === 4 && isWholeClose"
         alt="">
    <img src="../../assets/images/car/whole_open.png" class="wind_bg_open" v-if="activeNavIndex === 4 && !isWholeClose"
         alt="">


    <u-dialog :visible="dengyuVisible"
              title="灯语设置"
              show-close
              @closeHandler="dengyuVisible = false"
              hidde-bottom
    >
      <u-property-group :group="dengyuGroup" class="dengyuGroup">
        <template #huansong>
          <u-select :select-list="[
              {itemContent: '关闭'},
              {itemContent: '欢送灯语'},
              {itemContent: '延时照明'},
          ]" class="selectList"></u-select>
        </template>
      </u-property-group>
    </u-dialog>

    <u-dialog :visible="adjustVisible"
              title="后视镜调整"
              show-close
              @closeHandler="adjustVisible = false"
              @confirmHandler="adjustVisible = false"
              @cancelHandler="adjustVisible = false"
              confirm-context="保存当前位置"
              cancel-context="恢复至上次位置"
    >
      <div class="adjust-content">
        <div class="left">
          <div class="title">按方向盘右侧控制按钮调节后视镜位置</div>
          <div class="desc">将同步保存或恢复座椅、后视镜等驾驶相关设置</div>
          <div class="button-list" style="display: flex">
            <u-button class="card-button" :is-clicked="isClickedLeftBack"
                      @clickHandler="()=>{isClickedLeftBack = true}">
              <svg-icon icon-class="ic_left_back" class="ic_back_lamp">

              </svg-icon>
              <div class="name">
                左侧后视镜
              </div>
            </u-button>
            <u-button class="card-button" :is-clicked="!isClickedLeftBack"
                      @clickHandler="()=>{isClickedLeftBack = false}">
              <svg-icon icon-class="ic_right_back" class="ic_back_lamp">

              </svg-icon>
              <div class="name">
                右侧后视镜
              </div>
            </u-button>
          </div>
        </div>
        <img src="../../assets/images/car/system/adjust_bg.png" alt="" class="bg">
      </div>
    </u-dialog>

  </div>
</template>
<script>
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UNav from "@/components/basic/UNav.vue";
import UCard from "@/components/basic/UCard.vue";
import BScroll from "better-scroll";
import UTip from "@/components/basic/UToolTip.vue";
import UButton from "@/components/basic/UButton.vue";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: "CarOutsideSet",
  data() {
    return {
      activeNavIndex: 0,

      outsideSelectIndex: 3,
      adjustVisible: false,
      dengyuVisible: false,
      lockVisibleIndex: -1,
      isWholeClose: true,
      isClickedLeftBack: true,
      navList: [
        {text: '车外灯'},
        {text: '后视镜'},
        {text: '雨刮'},
        {text: '门锁'},
        {text: '车窗'},
        {text: '电动尾门'},
      ],
      outsideSelectList: [
        {itemContent: "关", isIcon: false},
        {itemContent: "ic_d", isIcon: true, className: "ic_d"},
        {itemContent: "ic_b", isIcon: true, className: "ic_b"},
        {itemContent: "自动", isIcon: false},
      ],
      wiperSelectList: [
        {itemContent: "低", isIcon: false},
        {itemContent: "标准", isIcon: false},
        {itemContent: "高", isIcon: false},
        {itemContent: "极高", isIcon: false},
      ],
      feedBackSelectList: [
        {itemContent: "仅闪灯", isIcon: false},
        {itemContent: "闪灯+音效", isIcon: false},
      ],
      carTextList: ["Hello RISING", "充电灯语", "迎宾灯语", "寻车灯语", "放电灯语", "欢送灯语"],
      activeButtonIndex: 0,
      openIndex: 6,
      cheweiIndex: -1,
      lampGroupList: [
        {
          itemList: [
            {
              id: "scene"
            }],
          hiddeBg: true,
        },
        {
          itemList: [
            {
              id: "front",
              leftContent: "充放电指示灯",
              infoContent: "充放电过程中，前后logo灯会持续呼吸展示充电状态",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
              isInfo: true,
              model: 'select',
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "R logo灯",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
              model: 'select'
            }]
        }
      ],
      backGroupList: [
        {
          title: "后视镜设置",
          itemList: [
            {
              leftContent: "锁车自动折叠",
              model: 'select',
            }
          ],
        },
        {
          title: "倒车时后视镜自动下倾",
          itemList: [
            {
              leftContent: "左侧后视镜",
              model: 'select',
            },
            {
              leftContent: "右侧后视镜",
              model: 'select',
            },
          ],
        },
      ],
      wiperGroupList: [
        {
          itemList: [
            {
              id: "autoWiper",
              leftContent: "自动雨刮灵敏度设置",
              infoContent: '雨刮器处手自动(AUTO》指时，雨刮将根据雨量传感\n' +
                  '器感应到的雨量自动调整雨刮的速度，灵敏度越\n' +
                  '高，雨刮对应的相对速度越高',
              isInfo: true,
              tipType: 'bottom',
            }
          ],
        },
      ],
      doorGroupList: [
        {
          title: '门锁设置',
          itemList: [
            {
              leftContent: "蓝牙钥匙近车解锁",
              infoContent: '携带手机靠近车辆时，车辆自动解锁，手机蓝牙钥匙\n' +
                  '受天气、周围环境等的影响，可能会被干扰，导致解\n' +
                  '锁功能失效',
              isInfo: true,
              isSwitchOn: true,
              model: 'select'
            },
            {
              leftContent: "蓝牙钥匙离车解锁",
              infoContent: '携带手机远离车辆时，车辆自动上锁;手机蓝牙钥匙\n' +
                  '受天气、周围环境等的影响，可能会被干扰，导致上\n' +
                  '锁功能失效;请务必确认车辆关门落锁后再离开',
              isInfo: true,
              isSwitchOn: true,
              model: 'select'
            },
            {
              leftContent: "遥控钥匙近车解锁",
              infoContent: '携带遥控钥匙靠近车辆时，车辆自动解锁',
              isInfo: true,
              isSwitchOn: true,
              model: 'select'
            },
            {
              leftContent: "遥控钥匙离车解锁",
              infoContent: '携带遥控钥匙远离车辆时，车辆自动上锁;请务必确\n' +
                  '认车辆关门落锁后再离开',
              isInfo: true,
              isSwitchOn: true,
              model: 'select'
            },
          ],
        },
        {
          itemList: [
            {
              leftContent: "锁车自动关窗",
              isSwitchOn: true,
              model: 'select'
            },
          ],
        },
        {
          itemList: [
            {
              id: "feedBack",
              leftContent: "寻车自动反馈",
              isSwitchOn: true,
              model: 'select'
            },
          ],
        },
      ],
      tailGroupList: [
        {
          title: "电动尾门设置",
          itemList: [
            {
              id: "tail",
              leftContent: "尾门开度设置",
            }
          ],
        },
      ],
      dengyuGroup: {
        itemList: [
          {
            leftContent: "迎宾灯语",
            isInfo: true,
            infoContent: '',
            model: 'select'
          },
          {
            id: 'huansong',
            leftContent: "欢送模式",
            isInfo: true,
            infoContent: '',
          },
        ],
      },
    };
  },
  components: {
    UDialog,
    UButton,
    UTip,
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
    chooseOutside(index) {
      this.outsideSelectIndex = index
    },
    handleSelected(index) {
      this.activeNavIndex = index
    },
    toggleHighLight(index) {
      this.activeButtonIndex = index
      console.log(this.activeButtonIndex)
    },
    clickProcess(index) {
      this.openIndex = index
    },
    clickLockHandler1(isClicked) {
      this.lockVisibleIndex = isClicked ? 1 : 0
      setTimeout(() => {
        this.lockVisibleIndex = -1
      }, 1000)
    },
    clickLockHandler2(isClicked) {
      this.lockVisibleIndex = isClicked ? 3 : 2
      setTimeout(() => {
        this.lockVisibleIndex = -1
      }, 1000)
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    openIndex(val) {
      this.cheweiIndex = val
    }
  }
};
</script>
<style scoped lang="scss">
.outside {
  width: 100%;
  height: 100%;
  padding: 65px 84px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  position: relative;

  .bg {
    position: absolute;
    width: 1279px;
    top: 292px;
    left: 900px;
    z-index: -1;
  }

  .front-bg {
    position: absolute;
    top: 385px;
    right: 142px;
    z-index: -1;
    width: 729.57px;
    height: 639.82px;
  }

  .wind_bg_close {
    position: absolute;
    width: 1392px;
    height: 580px;
    top: 410px;
    left: 740px;
    z-index: -1;
  }

  .wind_bg_open {
    position: absolute;
    width: 1312px;
    height: 634px;
    top: 389px;
    left: 692px;
    z-index: -1;
  }

  .img-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .inner-container {
      position: relative;

      .lock_img {
        position: absolute;
        height: 128px;
        width: 128px;
      }

      .right_lock_light, .right_lock_dark {
        top: 500px;
        right: 665px;
      }

      .left_lock_light, .left_lock_dark {
        top: 595px;
        right: 165px;
      }
    }
  }


  .nav {
    margin-bottom: 86px;
  }

  .operate {
    width: 100%;

    .lamp {
      width: 50%;
      .header {
        display: flex;

        .warning {
          width: 516px;
          height: 64px;
          margin-left: 32px;
          margin-top: 75px;
        }
      }
    }

    .scene {
      width: 100%;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 12px 0 36px;

        .left {
          display: flex;
          align-items: start;
          flex-direction: column;

          .desc {
          }
        }

        .right {
          font-size: 36px;
        }
      }

      .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .buttonCard {
          flex: 1 0 calc(33.33% - 60px); /* 设置每个子元素的宽度为1/3，考虑间隔 */
          margin: 10px; /* 添加间隔，这里设置为5px */
          margin-top: 20px;
          border-radius: 24px;
          font-size: 32px;
        }
      }

    }

    .door {
      width: 50%;
      .ic_middle_lock {
        width: 59.98px;
        height: 46.43px;
        margin-bottom: 12px;
      }

      .ic_right_child {
        width: 71.47px;
        height: 55.55px;
        margin-bottom: 12px;

      }

      .ic_left_child {
        width: 63.41px;
        height: 54.11px;
        margin-bottom: 12px;
      }
    }

    .wind {
      width: 50%;
      .ic_whole_open {
        width: 73px;
        height: 49px;
        margin-bottom: 12px;
      }

      .col {

      }

      .button-car-list {
        margin-left: 72px;

        .card-button {
          margin-bottom: 90px;
        }
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

  .button-car-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 55px;

    .ic_back_lamp {
      width: 233.22px;
      height: 232.77px;
    }
  }

  .col {
    flex-direction: column;
    align-items: start;
    //margin-top: 80px;

    .card {
      margin: 80px 0;
    }
  }

  .tail {
    width: 885px;
    .process {

    }


  }
  .chewei-img{
    position: absolute;
    width: 818px;
    height: 693px;
    display: flex;
    align-items: center;
    top: 292px;
    left: 1180px;
    img{
      width: 100%;
      object-fit: contain;
    }
  }

  .process-container {
    width: 100%;
    position: relative;

    .top {
      width: 100%;
      position: relative;

      .process {
        margin-top: 20px;

        height: 24px;
        background-color: #2B375C;
        border-radius: 12px;
        position: relative;

        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;

          li {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            z-index: 8;
            background-color: white;
          }

          .process-li {
            background-color: transparent;
          }
        }

        .currentProcess {
          position: absolute;
          height: 100%;
          background-color: #0E98FB;
          top: 50%;
          transform: translate(0, -50%);
          border-radius: 12px;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .current {
            width: 20px;
            height: 20px;
            background-color: transparent;
            border-radius: 50%;
            z-index: 10;
          }
        }
      }
    }

    .value {
      width: 32px;
      text-align: center;
      transform: translateX(-32px);
      margin-top: 12px;
      font-size: 28px;
    }
  }

  .dengyuGroup {
    width: 960px;
    margin-top: 48px;
  }
}

.selectList {
  margin-top: 29px;
}


.card-button {
  width: 233px;
  height: 233px;
  border-radius: 31px;
  display: flex;
  flex-direction: column;
  margin-bottom: 41px;

  .ic_back_lamp {
    width: 75.25px;
    height: 80.54px;
  }

  .name {
    margin-top: 23px;
  }
}

.adjust-content {
  width: 1560px;
  height: 680px;
  position: relative;

  .left {
    position: absolute;
    left: 72px;
    top: 142px;
    text-align: left;

    .title {
      font-size: 44px;
    }

    .desc {
      margin-bottom: 43px;
    }

    .card-button {
      width: 233px;
      height: 233px;
      border-radius: 31px;
      display: flex;
      flex-direction: column;
      margin-bottom: 41px;
      margin-right: 66px;

      .ic_back_lamp {
        width: 75.25px;
        height: 80.54px;
      }

      .name {
        margin-top: 23px;
      }
    }

  }

  .bg{
    position: absolute;
    top: -144px;
    left: -66px;
    z-index: -1;
    width: 1692.29px;
    height: 960px;
  }
}


.modelDialog {

}


.scroll-wrapper {
  height: 90%;
  overflow: hidden;
  border-radius: 0 58px 58px 0;
  box-sizing: border-box;

  .operate {
    height: 145%;
    //margin-top: 86px;
  }
}

</style>
