<template>
  <div class="process-container">

    <!-- <div class="process"
         @touchstart="handleTouchStart"
         @touchmove="dragProcess"
         ref="process"
         :style="{
           backgroundColor : bgColor,
           width: $px2vw(width),
           height: $px2vw(height),
         }"
    >
      <div class="current-process"
           :style="{
                  width : localPercent + '%',
                  backgroundColor : progressColor
               }"
      >
        <div class="value-container">
          <div class="value">

          </div>
        </div>

      </div>
      <div class="dot"></div>
    </div> -->
    <div
      class="process"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      ref="sliderBox"
      :style="{
        backgroundColor : bgColor,
        width: $px2vw(width),
        height: $px2vw(height),
      }"
    >
      <div class="current-process" ref="sliderActive">
        <div class="value-container">
          <div class="value">

          </div>
        </div>
      </div>
      <div class="dot"></div>
    </div>


    <div class="mask" v-show="isAbandon">

    </div>
  </div>

</template>

<script>
export default {
  name: 'UProgress',
  props: {
    percent: {
      type: Number,
      default: 20
    },
    showSlider: {
      type: Boolean,
      default: true
    },
    showPerText: {
      type: Boolean,
      default: true
    },
    // 进度条的宽度
    width: {
      type: Number,
      default: 480
    },
    height: {
      type: Number,
      default: 48
    },
    bgColor: {
      type: String,
      default: '#41557D'
    },
    progressColor: {
      type: String,
      default: '#009DFF'
    },
    // 滑块的宽度
    sliderWidth: {
      type: Number,
      default: 20
    },
    leftIconName: {
      type: String,
    },
    rightIconName: {
      type: String,
    },
    isAbandon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // touchPosition: {
      //   x: 0,
      //   y: 0,
      // },
      // processLeft: 0,
      // processWidth: 0,
      // localPercent: 0
      maxWidth: 0,
      startPageY: 0,
      moveLength: 0,
      endPageY: 0,
    };
  },
  computed: {
    // localWidth() {
    //   return this.px2vw(this.width) + 'vw'
    // },
    // localHeight() {
    //   return this.px2vw(this.height) + 'vh'
    // },
  },
  methods: {
    handleTouchStart(e) {
      if(this.startPageY === 0) {
          this.maxWidth = this.$refs.sliderBox.clientWidth
          this.endPageY = this.$refs.sliderActive.clientWidth
      }
      this.startPageY = e.changedTouches[0].pageY
      },
  handleTouchMove(e) {
      this.moveLength = e.changedTouches[0].pageY - this.startPageY + this.endPageY
      if(this.moveLength > this.maxWidth) {
          this.moveLength = this.maxWidth
          this.$refs.sliderActive.style.width = this.maxWidth + "px"
      }else if(this.moveLength < 0){
          this.moveLength = 0
          this.$refs.sliderActive.style.width = "0px"
      }else{
          this.$refs.sliderActive.style.width = this.moveLength + "px"
      }
    },
    handleTouchEnd(e) {
      this.endPageY = this.$refs.sliderActive.clientWidth
    },
    // handleTouchStart(event) {
    //   this.touchPosition.x = event.changedTouches[0].clientX;
    //   this.touchPosition.y = event.changedTouches[0].clientY;
    // }, //  记录初始触摸位置
    // dragProcess() {
    //   const currentY = event.changedTouches[0].clientY;
    //   this.leftDistance = currentY - this.processLeft
    //   this.localPercent = this.leftDistance / this.processWidth * 100
    //   if (this.localPercent <= 0) this.localPercent = 0
    //   if (this.localPercent >= 100) this.localPercent = 100
    //   // console.log(this.localPercent)
    //   // console.log("左边距", this.leftDistance)
    //   // console.log("总长度", this.processLeft)
    // },
    // subValue() {
    //   if (this.localPercent >= 5) this.localPercent -= 5
    // },
    // plusValue() {
    //   if (this.localPercent <= 95) this.localPercent += 5
    // }
  },
  mounted() {
    // const process = this.$refs.process;
    // const top = process.getBoundingClientRect().top;
    // const right = process.getBoundingClientRect().right;

    // this.processWidth = this.$refs.process.clientWidth;
    // this.processLeft = top;
    // this.processRight = right;

    // this.localPercent = this.percent
  },
}
</script>

<style scoped lang="scss">
$dotSize :22px;

.process-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0;

  .logo {
    width: 38px;
    height: 38px;
  }

  .process {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: rgba($color :#495E8E,$alpha:0.8);
    overflow: hidden;
    border-radius: 30px;
    box-sizing: border-box;
    height: 60px;


    .current-process {
      background: #049DFB;
      width: 150px;
      height: 100%;
      overflow: hidden;
      border-radius: 30px;
      position: absolute;
      left: 0;
      z-index: 5;
      // 设置透明度

      .value-container {
        position: relative;
        width: 100%;
        height: 100%;
        .value {
          position: absolute;
          top: 50%;
          transform: translate(0,-50%);
          right: 4px;
          width: $dotSize;
          height: $dotSize;
          background: #027DCC;
          border-radius: 50%;
        }
      }


    }

    .dot {
      position: absolute;
      width: $dotSize;
      height: $dotSize;
      border-radius: 50%;
      background-color: #38496D;
      left: 8px;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9;
  }

}
</style>

