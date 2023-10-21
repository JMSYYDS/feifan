<template>
  <!--车内设置界面-->
  <div class="inside">
    <div class="operate">
      <u-nav :items=navList :active-index="activeNavIndex" @item-selected="handleSelected" class="nav"></u-nav>

      <div class="scroll-wrapper" ref="scroll" v-show="activeNavIndex === 0">
        <div class="lamp lamp1">
          <u-property-group
              v-for="(group,index) in groupList" :key="index"
              :title="group.title"
              :group="group"
          >
          </u-property-group>

          <u-property-group
              v-show="subVisible"
              v-for="(group,index) in subGroupList" :key="index + 2"
              :title="group.title"
              :group="group"
          >
            <template #light>
              <div class="process">
                <u-progress :width=1440></u-progress>
              </div>
            </template>
            <template #lightColor>
              <div class="color-container">
                <div class="left">
                  <div class="row row1">
                    <div class="color-box" @click="colorIndex = 0">
                      <div class="color yellow" :class="{activeColor : colorIndex === 0}"></div>
                      <div class="name">落日黄</div>
                    </div>
                    <div class="color-box" @click="colorIndex = 1">
                      <div class="color red" :class="{activeColor : colorIndex === 1}"></div>
                      <div class="name">云霞红</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="color-box" @click="colorIndex = 2">
                      <div class="color blue" :class="{activeColor : colorIndex === 2}"></div>
                      <div class="name">天际蓝</div>
                    </div>
                    <div class="color-box" @click="colorIndex = 3">
                      <div class="color white" :class="{activeColor : colorIndex === 3}"></div>
                      <div class="name">月光白</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img src="../../assets/images/car/inside/color_bg.png" alt="" class="color_bg">
                </div>
              </div>
              <div class="right">

              </div>
            </template>
          </u-property-group>
        </div>
      </div>

      <div class="direction" v-show="activeNavIndex === 1">
        <div class="title">
          方向盘“☆”键自定义
        </div>
        <u-property-group>
          <template>
            <div class="lampGroup">
              <div v-for="(item,index) in lampGroupList" :key="index" class="list">
                <div class="top">
                  <div class="desc">{{ item.text }}</div>
                  <div class="outer" @click="clickOuter(index)" v-show="lampIndex !== index">
                  </div>
                  <div class="outer selected" @click="clickOuter(index)" v-show="lampIndex === index">
                    <div class="inner">

                    </div>
                  </div>
                </div>

                <div class="line" v-if="index !== lampGroupList.length - 1"></div>
              </div>
            </div>
          </template>
        </u-property-group>
      </div>
    </div>

    <img src="../../assets/images/car/inside/above_bg.png" alt="" class="bg" v-if="activeNavIndex === 0">
    <img src="../../assets/images/car/inside/media_bg.png" alt="" class="media_bg" v-if="activeNavIndex === 1">
  </div>
</template>
<script>


import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import UNav from "@/components/basic/UNav.vue";
import UProgress from "@/components/basic/UProcess.vue";
import BScroll from "better-scroll";

export default {
  name: "CarInsideSet",
  data() {
    return {
      colorIndex : 0,
      navList: [
        {text: '车内灯'},
        {text: '方向盘'},
      ],
      activeNavIndex: 0,
      subVisible: false,
      groupList: [
        {
          itemList: [
            {
              leftContent: "智能阅读灯",
              infoContent : '开启后，阅读灯将跟随车门开闭自动亮灭',
              rightContent: "",
              tipType : 'bottom',
              rightIconName: '',
              isDisabled: false,
              isInfo: true,
              model: 'select',
              switchData:()=>{}
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "氛围灯",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
              model: 'select',
              switchData: (data) => {
                this.subVisible = !this.subVisible
                // console.log("set : ",data)
              }
            }
          ],
        },
      ],
      subGroupList: [
        {
          itemList: [
            {
              leftContent: "空调出风口氛围灯",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
              model: 'select'
            },
          ]
        },
        {
          itemList: [
            {
              id: "light",
              leftContent: "氛围灯亮度",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
            },
          ]
        },
        {
          itemList: [
            {
              id:'lightColor',
              leftContent: "氛围灯颜色",
              rightContent: "",
              rightIconName: '',
              isDisabled: false,
            }
          ]
        },
        {
          title: "情景灯光",
          itemList: [
            {
              leftContent: "氛围灯迎宾",
              infoContent : '打开主驾车门后，氛围灯展现欢迎效果',
              model: "select",
              isInfo: true
            },
            {
              leftContent: "氛围灯律动",
              infoContent : '氛围灯律动包括音乐随动和语音联动两种氛围灯效\n' +
                  '果：\n' +
                  '(1)音乐随动：播放音乐时，氛围灯根据音乐律动\n' +
                  '闪烁\n' +
                  '(2)语音联动：根据不同区域的语音输入，对应区\n' +
                  '域的氛围灯动态变换',
              model: "select",
              isInfo: true
            },
          ]
        },
      ],
      lampGroupList: [
        {
          index: 0,
          text: "切换多媒体音源",
        },
        {
          index: 1,
          text: "开启/关闭自动泊车功能",
        },
        {
          index: 2,
          text: "行车影像（短按拍照、长按紧急录像）",
        },
        {
          index: 3,
          text: "开启/关闭360环视功能",
        },
      ],
      lampIndex: 0,
    };
  },
  components: {
    UProgress,
    UNav,
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
    },
    clickOuter(index) {
      this.lampIndex = index
    }
  },
  mounted() {
    this.init()
  },
  watch : {

  }
};
</script>
<style scoped lang="scss">
.inside {
  width: 100%;
  height: 100%;
  padding: 65px 84px;
  box-sizing: border-box;
  backdrop-filter: blur(200px);
  position: relative;

  .bg {
    position: absolute;
    left: 1079px;
    top: 178px;
    width: 822px;
    height: 819px;

    z-index: -1;
  }

  .media_bg {
    position: absolute;
    left: 1044px;
    top: 325px;
    width: 959px;
    height: 637px;

    z-index: -1;
  }

  .nav {
    margin-bottom: 86px;
  }
  .operate {
    width: 50%;
    height: 100%;

    .lamp {
      .color-container {
        display: flex;
        align-items: center;
        width: 100%;

        .left {
          width: 50%;
          padding: 10px 20px;
          box-sizing: border-box;
          .row1 {
            margin: 26px 0;
          }
          .row {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .color-box {
              display: flex;
              align-items: center;
              flex-direction: column;

              .color {
                width: 67px;
                height: 67px;
                border-radius: 25px;
                opacity: 1;
                margin-bottom: 16px;
              }

              .yellow {
                background: #F89C20;
              }

              .red {
                background: #EA3057;
              }

              .blue {
                background: #2C52EA;
              }

              .white {
                background: #C9ACD8;
              }
            }
          }
        }

        .right {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .color_bg {
            width: 254px;
            height: 254px;
          }
        }
      }
    }

    .direction {
      .title {
        font-size: 46px;
        font-weight: normal;
        line-height: 54px;
        letter-spacing: 0.06em;

        font-feature-settings: "kern" on;
        color: #FFFFFF;
        margin-bottom: 72px;
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

.lampGroup {
  padding-top: 31px;

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;


    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 31px;

      .outer {
        height: 28px;
        width: 28px;
        border-radius: 50%;
        border: #B8C0D4 4px solid;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .inner {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #009CFD;
        }
      }

      .selected {
        border: #009CFD 4px solid;
      }
    }

    .line {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.23);
      margin-bottom: 31px;

    }
  }
}

.scroll-wrapper {
  height: 90%;
  overflow: hidden;
  border-radius: 0 58px 58px 0;
  box-sizing: border-box;

  .lamp {
    height: 145%;
    //margin-top: 86px;
  }
}

.process {
  margin-top: 12px;
}

.activeColor {
  box-sizing: border-box;
  border: 6px solid #FCFCFC;
}

</style>
