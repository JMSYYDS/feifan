<template>
  <div class="seat-view">
    <SDialog :visible="isVisible"
             hiddeBottom
             title="座椅设置"
             show-close
             @closeHandler="()=>{isVisible = false}"
             is-light
             class="dialog"
    >
      <u-property-group class="group">
        <u-property-item model="select"
                         is-info
                         info-content="功能开启后，进出车辆时主驾座椅将根据保存的位置
自动切换，方便上下车，主驾座椅移动时请注意后排
乘客安全"
        >
          <template #leftContent>
            主驾便利进出
          </template>
        </u-property-item>
        <div class="line">

        </div>
        <u-property-item model="select"
                         is-info
                         info-content="功能开启后，主驾座椅将根据车内温度，自动开启加
热/通风"
        >
          <template #leftContent>
            主驾座椅加热/通风自动开启
          </template>
        </u-property-item>
      </u-property-group>
    </SDialog>
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
    <div class="seat-bg">
<!--      <img src="../../assets/images/view/seat_bg.png" v-if="navBackgroundActive === 0">-->
      <img src="../../assets/seat/bg1.png" v-if="navBackgroundActive === 0">
      <img src="../../assets/seat/bg2.png" alt="" v-if="navBackgroundActive === 1">
      <img src="../../assets/seat/bg3.png" alt="" v-if="navBackgroundActive === 2">
      <img src="../../assets/seat/bg4.png" alt="" v-if="navBackgroundActive === 3">
    </div>
    <img src="@/assets/seat/quxiao.png" alt="" class="seat-close" @click="handleClose()">
    <div class="seat-nav">
      <div class="seat-nav-item" v-for="(item, index) in navList" :key="item" @click="navBackgroundActive = index">
        {{ item }}
        <div class="base-line" :class="{ 'base-line-active': navBackgroundActive === index }">
        </div>
      </div>
    </div>
    <div class="set">
      <img src="@/assets/seat/ic_shezhi.png" alt="" @click="isVisible = true">
    </div>
    <div v-if="navBackgroundActive === 0">
      <div class="first">
        <BackgroundChange>
        </BackgroundChange>
        <img src="@/assets/seat/ic_sanre.png" alt="" width="60" height="60">
      </div>
      <div class="second">
        <Border>
          <template #1>
            <img src="@/assets/seat/00.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/11.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/22.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/33.png" alt="">
          </template>
        </Border>

      </div>
      <div class="third">
        <Border>
          <template #1>
            <img src="@/assets/seat/20.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/21.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/222.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/23.png" alt="">
          </template>
        </Border>
      </div>
      <div class="fourth">
        <Border>
          <template #1>
            <img src="@/assets/seat/00.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/11.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/22.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/33.png" alt="">
          </template>
        </Border>
      </div>
      <div class="fifth">
        <Border>
          <template #1>
            <img src="@/assets/seat/20.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/21.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/222.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/23.png" alt="">
          </template>
        </Border>
      </div>
      <div class="sixth">
        <Border>
          <template #1>
            <img src="@/assets/seat/00.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/11.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/22.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/33.png" alt="">
          </template>
        </Border>
      </div>
      <div class="seventh">
        <Border>
          <template #1>
            <img src="@/assets/seat/20.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/21.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/222.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/23.png" alt="">
          </template>
        </Border>
      </div>
      <div class="eighth">
        <Border>
          <template #1>
            <img src="@/assets/seat/00.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/11.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/22.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/33.png" alt="">
          </template>
        </Border>
      </div>
      <div class="ninth" :judge="true">
        <Border>
          <template #1>
            <img src="@/assets/seat/20.png" alt="">
          </template>
          <template #2>
            <img src="@/assets/seat/21.png" alt="">
          </template>
          <template #3>
            <img src="@/assets/seat/222.png" alt="">
          </template>
          <template #4>
            <img src="@/assets/seat/23.png" alt="">
          </template>
        </Border>
      </div>
    </div>
    <div v-if="navBackgroundActive === 1">
      <div class="button-left button" :class="{ 'button-active': leftShow }" @click="leftShow = !leftShow">
        <img src="@/assets/seat/452.png" alt="">
      </div>
      <div class="button-right button" :class="{ 'button-active': rightShow }" @click="rightShow = !rightShow">
        <img src="@/assets/seat/452.png" alt="">
      </div>
      <div class="maichong-left button" v-show="leftShow" @click="leftDown = !leftDown">
        <img src="@/assets/seat/401.png" alt="" v-if="leftDown">
        <img src="@/assets/seat/40.png" alt="" v-else>

        脉冲
      </div>
      <div class="maichong-right button" v-show="rightShow" @click="rightDown = !rightDown">
        脉冲
        <img src="@/assets/seat/40.png" alt="" v-if="rightDown">
        <img src="@/assets/seat/401.png" alt="" v-else>

      </div>
      <div class="left-frame" v-show="leftShow && leftDown">
        <div class="left-frame-item" v-for="(item, index) in frameList" :key="item" @click="leftItem = index"
             :class="{ 'left-frame-item-active': leftItem === index }">
          {{ item }}
          <img src="@/assets/seat/998.png" alt="" v-show="leftItem === index">
        </div>
      </div>
      <div class="right-frame" v-show="rightShow && rightDown">
        <div class="left-frame-item" v-for="(item, index) in frameList" :key="item"
             :class="{ 'left-frame-item-active': rightItem === index }" @click="rightItem = index">
          {{ item }}
          <img src="@/assets/seat/998.png" alt="" v-show="rightItem === index">
        </div>
      </div>
      <div class="light-left" v-show="leftShow && leftDown">
        <Border>
          <template #1>
            <svg-icon iconClass="ic_ammo" class="ic"></svg-icon>
          </template>
          <template #2>
            <svg-icon iconClass="ic_ammo1" class="ic"></svg-icon>
          </template>
          <template #3>
            <svg-icon iconClass="ic_ammo2" class="ic"></svg-icon>
          </template>
          <template #4>
            <img src="@/assets/seat/ic_ammo3.png" alt="">
          </template>
        </Border>
      </div>
      <div class="light-right" v-show="rightShow && rightDown">
        <Border>
          <template #1>
            <svg-icon iconClass="ic_ammo" class="ic"></svg-icon>
          </template>
          <template #2>
            <svg-icon iconClass="ic_ammo1" class="ic"></svg-icon>
          </template>
          <template #3>
            <svg-icon iconClass="ic_ammo2" class="ic"></svg-icon>
          </template>
          <template #4>
            <img src="@/assets/seat/ic_ammo3.png" alt="">
          </template>
        </Border>
      </div>
    </div>
    <div v-if="navBackgroundActive === 2 || navBackgroundActive === 3">
      <div class="main-drive" :class="{ 'drive-active': navBackgroundActive === 2 }" @click="navBackgroundActive = 2">
        主驾
      </div>
      <div class="sub-drive" :class="{ 'drive-active': navBackgroundActive === 3 }" @click="navBackgroundActive = 3">
        副驾
      </div>
      <div class="dialogue" v-show="keepActive && keep">
        保存成功
      </div>
      <div class="three-button">
        <button class="three-button-item" :style="{ 'background-color': '#009DFF' }"
                :class="{ 'three-button-item-active1': keep }" @click="keepChange()" :disabled="keepActive">
          保存
        </button>
        <div class="three-button-item" :class="{ 'three-button-item-active1': recover }"
             @click="recover = !recover">
          恢复
        </div>
        <div class="three-button-item" @click="()=>{
          adjustVisible = true
        }">
          后视镜
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundChange from './component/BackgroundChange.vue'
import Border from './component/Border.vue'
import SDialog from '@/components/basic/SDialog.vue';
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UButton from "@/components/basic/UButton.vue";
import UDialog from "@/components/basic/UDialog.vue";

export default {
  name: 'QicheCliSeatView',
  components: {
    UDialog, UButton,
    UPropertyItem,
    UPropertyGroup,
    BackgroundChange,
    Border,
    SDialog
  },
  data() {
    return {
      isVisible: false,
      adjustVisible : false,
      timer: null,
      keepActive: false,
      keep: false,
      recover: false,
      leftDown: false,
      rightDown: false,
      leftItem: 0,
      rightItem: 0,
      leftShow: false,
      rightShow: false,
      navBackgroundActive: 0,
      judge: '',
      navList: [
        '通风加热',
        '舒适按摩',
        '座椅位置'
      ],
      frameList: [
        '脉冲',
        '舒缓',
        '波浪',
        '蝶形',
        '猫步',
        '腰部',
        '单排',
        '蛇形',
      ],
      isClickedLeftBack: true,
    };
  },
  mounted() {

  },

  methods: {
    handleClose() {
      this.$router.push("/home")
    },
    keepChange() {
      this.keep = !this.keep
      this.keepActive = true
      if (this.timer) return
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.keepActive = false
          this.keep = false
          this.timer = null
        }, 1500)
      }

    }
  },
  beforeDestroy() {
    if (this.timer) {
      this.timer = null
    }
  }
};
</script>

<style lang="scss" scoped>
.seat-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;


  .seat-bg {
    position: absolute;
    top: 119px;
    left: 18px;
    width: 2527.44px;
    height: 1282.5px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .seat-menu {
    position: absolute;
    top: 146px;
    left: 76px;
    width: 2430.34px;
    height: 98.92px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .seat-close {
    position: absolute;
    top: 177px;
    left: 76px;
    width: 32px;
    height: 32px;
  }

  .seat-nav {
    position: absolute;
    top: 155px;
    margin-left: 188px;
    display: flex;
    font-family: HarmonyOS Sans SC;
    font-size: 44px;
    font-weight: 500;
    line-height: 66px;
    letter-spacing: 0em;
    font-feature-settings: "kern" on;
    color: #FFFFFF;

    .seat-nav-item {
      text-align: center;
      margin-right: 102px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .base-line {
        width: 67px;
        height: 4px;
        margin-top: 8px;
      }

      .base-line-active {
        background: #FFFFFF;
      }
    }
  }

  .set {
    width: 98px;
    height: 99px;
    border-radius: 26px;
    opacity: 1;
    background: #49475C;
    position: absolute;
    top: 155px;
    left: 2400px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 45px;
      height: 43px;

    }
  }

  .first {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1060px;
    top: 289px;

    img {
      position: absolute;
      z-index: 1;
      width: 60px;
      height: 60px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .second {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1060px;
    top: 499px;


  }

  .third {
    width: 138px;
    height: 138px;
    border-radius: 50%;

    position: absolute;
    left: 1060px;
    top: 673px;


  }

  .fourth {
    width: 138px;
    height: 138px;
    position: absolute;
    left: 1060px;
    top: 919px;


  }

  .fifth {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1060px;
    top: 1093px;


  }

  .sixth {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1349px;
    top: 499px;


  }

  .seventh {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1349px;
    top: 673px;


  }

  .eighth {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1349px;
    top: 919px;


  }

  .ninth {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1349px;
    top: 1093px;


  }

  .button-left {

    border-radius: 22px;
    background: #3F4664;
    position: absolute;
    left: 1012px;
    top: 432px;
  }

  .button-right {

    border-radius: 22px;
    background: #3F4664;
    position: absolute;
    top: 432px;
    left: 1311px;
  }

  .button {
    width: 239px;
    height: 93px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
    letter-spacing: 0em;
    font-feature-settings: "kern" on;
    color: #FFFFFF;

    img {
      width: 36px;
      height: 36px;
    }
  }

  .button-active {
    background: #009DFF;
  }

  .maichong-left {
    background: #3F4664;
    border-radius: 18px;
    position: absolute;
    left: 1012px;
    top: 557px;
    opacity: 0.7;

    img {
      width: 20px;
      height: 20px;
      margin-right: 48px;
    }
  }

  .maichong-right {
    background: #3F4664;
    border-radius: 18px;
    position: absolute;
    left: 1311px;
    top: 557px;
    opacity: 0.7;

    img {
      width: 20px;
      height: 20px;
      margin-left: 48px;
    }
  }

  .left-frame {
    position: absolute;
    left: 455px;
    top: 555px;
    width: 452px;
    height: 624px;
    border-radius: 20px;
    background: rgb(37, 40, 65, .7);
    display: flex;
    flex-wrap: wrap;

    .left-frame-item {
      font-family: HarmonyOS Sans SC;
      font-size: 40px;
      font-weight: normal;
      line-height: 156px;
      letter-spacing: -0.04em;
      font-feature-settings: "kern" on;
      color: #FAFAFA;
      width: 50%;
      height: 25%;
      text-align: center;
      position: relative;

      img {
        width: 24px;
        height: 3px;
        position: absolute;
        top: 108px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .left-frame-item-active {
      font-weight: 600;
    }
  }

  .right-frame {
    position: absolute;
    left: 1642px;
    top: 555px;
    width: 452px;
    height: 624px;
    border-radius: 20px;
    background: rgb(37, 40, 65, .7);
    display: flex;
    flex-wrap: wrap;

    .left-frame-item {
      font-family: HarmonyOS Sans SC;
      font-size: 40px;
      font-weight: normal;
      line-height: 156px;
      letter-spacing: -0.04em;
      font-feature-settings: "kern" on;
      color: #FAFAFA;
      width: 50%;
      height: 25%;
      text-align: center;
      position: relative;

      img {
        width: 24px;
        height: 3px;
        position: absolute;
        top: 108px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .left-frame-item-active {
      font-weight: 500;
    }
  }

  .light-left {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1055px;
    top: 744px;
  }

  .light-right {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;
    left: 1360px;
    top: 744px;
  }

  .three-button {
    font-family: HarmonyOS Sans SC;
    font-size: 36px;
    font-weight: normal;
    line-height: 84px;
    letter-spacing: 0em;
    font-feature-settings: "kern" on;
    color: #FFFFFF;
    position: absolute;
    left: 70px;
    top: 561px;


    .three-button-item {
      width: 171px;
      height: 84px;
      border-radius: 24px;
      opacity: 1;
      background: #464767;
      margin-top: 40px;
      text-align: center;
      border: 0px;
      color: #FFFFFF;
      font-family: HarmonyOS Sans SC;
      font-size: 36px;
      font-weight: normal;
      line-height: 84px;
      letter-spacing: 0em;
      font-feature-settings: "kern" on;
      color: #FFFFFF;

    }

    .three-button-item-active1 {
      opacity: 0.6;
    }
  }

  .dialogue {
    position: absolute;
    width: 475px;
    height: 122px;
    border-radius: 32px;
    opacity: 1;
    background: #000000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: HarmonyOS Sans SC;
    font-size: 36px;
    font-weight: normal;
    line-height: 122px;
    letter-spacing: -0.01em;
    font-feature-settings: "kern" on;
    color: #FFFFFF;
    text-align: center;

  }

  .main-drive,
  .sub-drive {
    font-family: HarmonyOS Sans SC;
    font-size: 40px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0.04em;
    font-feature-settings: "kern" on;
    color: #FCFCFC;
    position: absolute;
  }

  .main-drive {
    left: 515px;
    top: 730px;
    z-index: 4;
  }

  .sub-drive {
    left: 1975px;
    top: 730px;
    z-index: 4;
  }

  .drive-active {
    font-weight: 600;
  }
}

.dialog {
  .group{
    margin-top: 64px;
  }
  .line {
    height: 0px;
    opacity: 0.2;
    border: 2.2px solid #FFFFFF;
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
      font-size: 30px;
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

</style>
