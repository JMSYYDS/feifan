<template>
  <div class="temperature-view">
    <img src="../../assets/images/air/bg.png" class="temperature-bg">
    <svg-icon icon-class="dialog_close" class="car-close" @click="handleClose"></svg-icon>

    <div class="content">
      <div class="header">
        <svg-icon icon-class="ic_wind_left" class="ic_wind_left" @click="handleClose"></svg-icon>
        <u-progress :width="1015" class="process"></u-progress>
        <svg-icon icon-class="ic_wind_right" class="ic_wind_right" @click="handleClose"></svg-icon>
      </div>
      <div class="body">
        <div class="left">
          <scroll-select :options="options" :value="25"></scroll-select>
          <u-button class="sync" :is-clickable="true">同步</u-button>
        </div>

        <div class="right">
          <scroll-select :options="options" :value="25"></scroll-select>
        </div>
      </div>

      <div class="bottom">
        <div class="bottom-button small">
          <svg-icon icon-class="ic_on_off" class="open"
                    :style="{
                      color : isOpen ? '#019DFE' : '#fff'
                     }"
                    @click="toggleOpen"
          ></svg-icon>
        </div>

        <div class="bottom-button middle">
          <div
              :style="{
                      color : isOpen && isAC ? '#019DFE' : '#fff'
                     }"
              @click="toggleAC"
          >A/C</div>
          <div :style="{
                      color : isOpen && isAuto ? '#019DFE' : '#fff'
                     }"
               @click="toggleAuto"
          >AUTO</div>
        </div>

        <div class="bottom-button large">
          <svg-icon icon-class="ic_chui1" class="chui"
                    :style="{
                      color :  isOpen && isTop ? '#019DFE' : '#fff'
                     }"
                    @click="()=>{isTop = !isTop}"
          ></svg-icon>
          <svg-icon icon-class="ic_chui2" class="chui"
                    :style="{
                      color :  isOpen && isMiddle ? '#019DFE' : '#fff'
                     }"
                    @click="()=>{isMiddle = !isMiddle}"
          ></svg-icon>
          <svg-icon icon-class="ic_chui3" class="chui"
                    :style="{
                      color :  isOpen && isBottom ? '#019DFE' : '#fff'
                     }"
                    @click="()=>{isBottom = !isBottom}"
          ></svg-icon>
          <div class="line">

          </div>
          <svg-icon icon-class="ic_AUTO" class="auto"></svg-icon>
          <div :style="{
                      color : isECON ? '#019DFE' : '#fff'
                     }"
               @click="()=>{isECON = !isECON}"
          >ECON</div>
        </div>

        <div class="bottom-button middle">
          <svg-icon icon-class="ic_sanre" class="sanre"
                    :style="{
                      color : isSanre ? '#FFA714' : '#fff'
                     }"
                    @click="()=>{isSanre = !isSanre}"
          ></svg-icon>
          <svg-icon icon-class="ic_exhaust" class="exhaust"
                    :style="{
                      color : isExhaust ? '#019DFE' : '#fff'
                     }"
                    @click="()=>{isExhaust = !isExhaust}"
          ></svg-icon>

        </div>

        <div class="bottom-button small">
          <svg-icon icon-class="ic_shezhi" class="set" @click="()=>{setDialogVisible = true}"></svg-icon>
        </div>

      </div>
    </div>

    <s-dialog :visible="setDialogVisible"
              :hidde-bottom="true"
              title="空调设置"
              :show-close="true"
              :is-light="true"
              @closeHandler="()=>{setDialogVisible = false}"
              class="setDialog"
    >
      <u-property-group
          v-for="(group,key) in groupList" :key="key"
          :title="group.title"
          :group="group"
          class="group"
      >
        <template #sensitivity>
          <u-select :select-list="sensitivitySelect" class="selectList"></u-select>
        </template>

        <template #auto>
          <u-select :select-list="autoSelect" class="selectList"></u-select>
        </template>
      </u-property-group>
    </s-dialog>
  </div>
</template>

<script>
import UProgress from "@/components/basic/UProcess.vue";
import UButton from "@/components/basic/UButton.vue";
import ScrollSelect from "@/components/basic/SScroller.vue";
import SDialog from "@/components/basic/SDialog.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";

export default {
  name: 'QicheCliTemperatureView',
  components: {USelect, UPropertyGroup, SDialog, ScrollSelect, UButton, UProgress},

  data() {
    return {
      isOpen: false,
      isAC: false,
      isAuto: false,
      isTop :false,
      isMiddle :false,
      isBottom :false,
      isECON: false,
      isSanre: false,
      isExhaust: false,
      setDialogVisible: false,
      options: [
        {value: 0, text: 'Lo'},
        {value: 18, text: '18°'},
        {value: 19, text: '19°'},
        {value: 20, text: '20°'},
        {value: 21, text: '21°'},
        {value: 22, text: '22°'},
        {value: 23, text: '23°'},
        {value: 24, text: '24°'},
        {value: 25, text: '25°'},
        {value: 26, text: '26°'},
        {value: 27, text: '27°'},
        {value: 28, text: '28°'},
        {value: 29, text: '29°'},
        {value: 30, text: '30°'},
        {value: 31, text: '31°'},
        {value: 32, text: 'Hi'},
      ],
      groupList: [
        {
          itemList: [
            {
              id:'auto',
              leftContent: "AUTO 模式风量",
            },
          ]
        },
        {
          itemList: [
            {
              leftContent: "空气质量传感器",
              isInfo : true,
              infoContent: "功能开启后，传感器将监测空气质量，车辆会根据监\n" +
                  "测情况自动控制内外储环，以防尾气进入车内",
              model: 'select',
            },
            {
              id:'sensitivity',
              leftContent: "空气质量传感器",
            }
          ],
        },
        {
          itemList: [
            {
              leftContent: "后风窗自动加热",
              isInfo : true,
              infoContent: "功能开启后，车辆处于拥堵或进入降道时，循环模式\n" +
                  "自动切换为内循环",

              model: 'select',
            },
            {
              leftContent: "跟随整车ECON",
              isInfo : true,
              infoContent: "功能开启后，环境温度较低时开启前除霜，后风窗将\n" +
                  "会省动异居加热",
              model: 'select',
            },
            {
              leftContent: "智能空调",
              isInfo : true,
              infoContent: "功能开启后，车辅进入/建出超级节能模式。空调跟随进入/退出ECON模式\n",
              model: 'select',
            },
          ],
        },

      ],
      autoSelect:[
        {itemContent: "低", isIcon: false},
        {itemContent: "中", isIcon: false},
        {itemContent: "高", isIcon: false},
      ],
      sensitivitySelect:[
        {itemContent: "低", isIcon: false},
        {itemContent: "高", isIcon: false},
      ],

    };
  },

  mounted() {

  },

  methods: {
    handleClose() {
      this.$router.push("/home")
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.isAC = true
        this.isTop = true
      }
    },
    toggleAC() {
      this.isAC = !this.isAC
    },
    toggleAuto() {
      this.isAuto = !this.isAuto
      if (this.isAuto) {
        this.isOpen = true
        this.isAC = true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.temperature-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 140px 32px 30px;

  .temperature-bg {
    position: absolute;
    top: 136px;
    width: 2496.12px;
    height: 1264.66px;
  }

  .car-close {
    position: absolute;
    top: 193px;
    left: 90px;
    width: 32px;
    height: 32px;
  }

  .content {
    box-sizing: border-box;
    padding: 100px 60px;
    width: 100%;

    .header {
      display: flex;
      align-items: center;
      justify-content: center;

      .process {
        margin: 0 32px 0 14px;
      }

      .ic_wind_left {
        width: 80px;
        height: 80px;
        z-index: 1;
      }

      .ic_wind_right {
        width: 56px;
        height: 56px;
        z-index: 1;
      }
    }

    .body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 220px;
      padding: 0 60px;
      box-sizing: border-box;

      .left {
        position: relative;

        .sync {
          position: absolute;
          width: 149.6px;
          height: 63.54px;

          border-radius: 32.58px;
          opacity: 1;
          background: #585778;
          margin-top: 42px;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 96px;
      left: 180px;
      display: flex;
      color: #FFFFFF;
      font-size: 24px;
      right: 228px;
      justify-content: space-between;
      align-items: center;

      .bottom-button {
        height: 108px;
        border-radius: 27px;
        opacity: 1;
        box-sizing: border-box;
        background: #676991;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }

      .small {
        width: 108px;
      }

      .middle {
        width: 382.96px;
      }

      .large {
        width: 877px;
      }

      .line {
        width: 3.96px;
        height: 20px;
        opacity: 1;
        background: linear-gradient(269deg, #7B7D9F 5%, #717398 51%);
      }

      .open {
        width: 43.04px;
        height: 42.16px;
        opacity: 0.5;
      }

      .chui {
        width: 36px;
        height: 36px;
      }

      .auto {
        width: 62px;
        height: 20px;
      }

      .sanre {
        width: 38px;
        height: 39px;
      }

      .exhaust {
        width: 43px;
        height: 37px;
      }

      .set {
        width: 64px;
        height: 64px;
      }
    }
  }
}

.setDialog {
  .group {
    width: 960px;
  }

  .selectList {
    margin-top: 24px;
  }
}
</style>