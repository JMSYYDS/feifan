<template>
  <div class="quickControl">

    <div class="quick-content" :class="isShow?'quick-content-active':''">
      <div v-show="carOutside === 1">
        <!-- 车外灯 -->
        <div class="outside">
          <div class="scroll-wrapper" ref="scroll">
            <div class="operate">

              <!--车外灯-->
              <div class="lamp">
                <div class="header">
                  <u-button class="card-button" is-clickable>
                    <svg-icon icon-class="ic_back_lamp" class="ic_back_lamp">

                    </svg-icon>
                    <div class="name">
                      后雾灯
                    </div>
                  </u-button>
                  <img src="../../assets/images/car/outside/warn.png" alt="" class="warning"
                       v-show="outsideSelectIndex <= 1">
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
                            <u-tip
                                content="车辆外灯可在不同场景（如打招呼，靠近车辆，离车，充电、放点、寻车）下显示相应的灯光效果">
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
                        >
                          <div class="content">
                            {{ item }}
                          </div>
                        </u-card>
                      </div>
                    </div>
                  </template>
                </u-property-group>


              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-show="carOutside === 2">
        <!-- 后视镜 -->

        <div class="back">
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
      </div>
      <div v-show="carOutside === 3">
        <!-- 车窗 -->
        <div class="wind">
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

      </div>
    </div>
    <div v-if="quickCarImg" class="quick-img" :class="isShow?'quick-img-active':''">
      <img v-if="!isShow" src="../../assets/images/car/quick_bg4.png" alt="" class="quickBg1">
      <img v-if="isShow && isWholeClose" src="../../assets/images/car/quick_bg2.png" alt=""
           @click="isShow = false;carOutside = 0;quickCarImg = true">
      <img v-if="isShow && !isWholeClose" src="../../assets/images/car/whole_open.png" alt=""
           @click="isShow = false;carOutside = 0;quickCarImg = true">
      <div v-if="!isShow">
        <div class="quick-img-click1" @click.stop="clickHandler"></div>
        <div class="quick-img-click2" @click.stop="carOutside = 2;isShow = true"></div>
        <div class="quick-img-click3" @click.stop="carOutside = 3;isShow = true"></div>
        <div class="quick-img-click4" @click.stop="quickCarImg = false"></div>
      </div>
    </div>
    <div v-if="!quickCarImg" class="quick-img" :class="isShow?'quick-img-active':''">
      <img v-if="!isShow" src="../../assets/images/car/quick_bg3.png" alt="" class="quickBg1">
      <img v-if="isShow  && isWholeClose" src="../../assets/images/car/quick_bg2.png" alt=""
           @click="isShow = false;carOutside = 0;quickCarImg = true">
      <img v-if="isShow && !isWholeClose" src="../../assets/images/car/whole_open.png" alt=""
           @click="isShow = false;carOutside = 0;quickCarImg = true">
      <div v-if="!isShow">
        <div class="quick-img-click5" @click.stop="carOutside = 1;isShow = true"></div>
        <div class="quick-img-click6" @click.stop="carOutside = 2;isShow = true"></div>
        <div class="quick-img-click7" @click.stop="carOutside = 3;isShow = true"></div>
        <div class="quick-img-click8" @click.stop="quickCarImg = true"></div>
      </div>
    </div>
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
import UTip from "@/components/basic/UToolTip.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UButton from "@/components/basic/UButton.vue";
import USelect from "@/components/basic/USelect.vue";
import UCard from "@/components/basic/UCard.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import BScroll from "better-scroll";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: "QuickControl",
  components: {UDialog, UPropertyGroup, UCard, USelect, UButton, UPropertyItem, UTip},
  data() {
    return {
      isShow: false,
      carOutside: 0,
      quickCarImg: true,
      outsideSelectIndex: 3,
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
      dengyuVisible: false,
      activeButtonIndex: 0,
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
      adjustVisible: false,
      isClickedLeftBack: true,
      isWholeClose: true,


      outsideSelectList: [
        {itemContent: "关", isIcon: false},
        {itemContent: "ic_d", isIcon: true, className: "ic_d"},
        {itemContent: "ic_b", isIcon: true, className: "ic_b"},
        {itemContent: "自动", isIcon: false},
      ],
      carTextList: ["Hello RISING", "充电灯语", "迎宾灯语", "寻车灯语", "放电灯语", "欢送灯语"],
    }
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
    toggleHighLight(index) {
      this.activeButtonIndex = index
      console.log(this.activeButtonIndex)
    },
    clickHandler () {
      this.carOutside = 1;
      this.isShow = true;
      setTimeout(() => {
        this.bs.refresh()
      }, 200)
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 200)

  },
  watch: {
    isShow: {
      handler(val) {
        this.$emit("sliderRadius", val)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.quickControl {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .quick-content {
    width: 0;
    height: 100%;
    // background-color: red;
    transition: all .4s;

    .outside {
      width: 887px;
      backdrop-filter: blur(100px);
      background: rgba($color: #ffffff, $alpha: 0.2);
      border-radius: 0 57px 57px 0;
      height: 1288.58px;
      padding: 65px 84px;
      box-sizing: border-box;
      //backdrop-filter: blur(100px);
      position: relative;

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

      .operate {
        width: 100%;


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

              .content {
                transform: scale(0.75);
                white-space: nowrap;
              }
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
              width: 96px;
              height: 96px;
            }
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

      .chewei-img {
        width: 818px;
        height: 693px;
        display: flex;
        align-items: center;

        img {
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
          width: 40px;
          text-align: center;
          transform: translateX(-20px)
        }
      }

      .dengyuGroup {
        width: 960px;
        margin-top: 48px;
      }

      .lamp {

        .header {
          display: flex;

          .warning {
            //width: 516px;
            height: 48px;
            margin-left: 32px;
            margin-top: 75px;
          }
        }

        .outside-lamp {
          display: flex;
          justify-content: center;
          align-items: center;

          .ic_outside_lamp {
            margin-left: 12px;
            width: 44px;
            height: 44px;
          }

        }

      }

    }

    .back {
      height: 1288.58px;
      width: 887px;
      padding: 128px 32px 0;
      box-sizing: border-box;
      backdrop-filter: blur(100px);
      background: rgba($color: #ffffff, $alpha: 0.2);

      border-radius: 0 57px 57px 0;

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

    }

    .wind {
      width: 400px;
      height: 1288.58px;
      backdrop-filter: blur(100px);
      background: rgba($color: #ffffff, $alpha: 0.2);

      border-radius: 0 57px 57px 0;


      display: flex;
      align-items: center;

      .ic_whole_open {
        width: 73px;
        height: 49px;
        margin-bottom: 12px;
      }

      .col {

      }

      .button-car-list {
        margin-left: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin-bottom: 55px;

        .card-button {
          margin-bottom: 90px;
          display: flex;
          flex-direction: column;
          height: 228px;
          width: 228px;

          .name {
            margin-top: 24px;
          }
        }
      }

    }

  }

  .quick-content-active {
    width: 887px;
  }

  .quick-img {
    position: relative;
    margin-left: 420px;
    width: 1010px;
    transition: all .4s;

    img {
      width: 1010px;
      object-fit: contain;
    }

    .quickBg1 {
      // width: 1227.97px;
      // object-fit: contain;
    }

    .quick-img-click1 {
      position: absolute;
      bottom: 200px;
      left: 300px;
      width: 50px;
      height: 50px;
    }

    .quick-img-click2 {
      position: absolute;
      bottom: 300px;
      left: 540px;
      width: 50px;
      height: 50px;
    }

    .quick-img-click3 {
      position: absolute;
      bottom: 380px;
      left: 720px;
      width: 50px;
      height: 50px;
    }

    .quick-img-click4 {
      position: absolute;
      bottom: 320px;
      left: 920px;
      width: 50px;
      height: 50px;
    }

    .quick-img-click8 {
      position: absolute;
      bottom: 220px;
      left: 820px;
      width: 50px;
      height: 50px;
      //background-color: red;
    }

    .quick-img-click7 {
      position: absolute;
      bottom: 300px;
      left: 570px;
      width: 50px;
      height: 50px;
      //background-color: red;
    }

    .quick-img-click6 {
      position: absolute;
      bottom: 250px;
      left: 300px;
      width: 50px;
      height: 50px;
      //background-color: red;
    }

    .quick-img-click5 {
      position: absolute;
      bottom: 230px;
      left: 50px;
      width: 50px;
      height: 50px;
      //background-color: red;
    }
  }

  .quick-img-active {
    margin-left: 20px;
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

  .bg {
    position: absolute;
    top: -144px;
    left: -66px;
    z-index: -1;
    width: 1692.29px;
    height: 960px;
  }
}


.scroll-wrapper {
  height: 100%;
  overflow: hidden;
  border-radius: 0 58px 58px 0;
  box-sizing: border-box;

  .operate {
    height: 120%;
    //margin-top: 86px;
  }
}

</style>
