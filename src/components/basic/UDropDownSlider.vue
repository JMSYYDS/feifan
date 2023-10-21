<template>
    <div class="process-container">
  
      <div class="process"
           @touchstart="handleTouchStart"
           @touchmove="dragProcess"
           ref="process"
      >
        <div class="current-process"
             :style="{
                    width : localPercent + '%',
                    backgroundColor : progressColor
                 }"
        >
  
        </div>
      </div>
      
      <div class="process-icon">
        <svg-icon :iconClass="iconName" class="icon"></svg-icon>
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
      },
      iconName: {
        type: String,
      }
    },
    data() {
      return {
        touchPosition: {
          x: 0,
          y: 0,
        },
        processLeft: 0,
        processWidth: 0,
        localPercent: 0
      };
    },
    computed: {
      localWidth() {
        return this.px2vw(this.width) + 'vw'
      },
      localHeight() {
        return this.px2vw(this.height) + 'vh'
      },
    },
    methods: {
      handleTouchStart(event) {
        this.touchPosition.x = event.changedTouches[0].clientX;
        this.touchPosition.y = event.changedTouches[0].clientY;
      }, //  记录初始触摸位置
      dragProcess() {
        const currentY = event.changedTouches[0].clientY;
        this.leftDistance = currentY - this.processLeft
        this.localPercent = this.leftDistance / this.processWidth * 100
        if (this.localPercent <= 0) this.localPercent = 0
        if (this.localPercent >= 100) this.localPercent = 100
        // console.log(this.localPercent)
        // console.log("左边距", this.leftDistance)
        // console.log("总长度", this.processLeft)
      },
      subValue() {
        if (this.localPercent >= 5) this.localPercent -= 5
      },
      plusValue() {
        if (this.localPercent <= 95) this.localPercent += 5
      }
    },
    mounted() {
      const process = this.$refs.process;
      const top = process.getBoundingClientRect().top;
      const right = process.getBoundingClientRect().right;
  
      this.processWidth = this.$refs.process.clientWidth;
      this.processLeft = top;
      this.processRight = right;
  
      this.localPercent = this.percent
    },
  }
  </script>
  
  <style scoped lang="scss">
  $dotSize :28px;
  
  .process-container {
    width: 681.92px;
    height: 132.67px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0;
    background-color: rgb(88, 121, 161);
    border-radius: 30px;
  
    .logo {
      width: 38px;
      height: 38px;
    }
  
    .process {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    //   background: rgba($color :#495E8E,$alpha:0.8);
        background-color: rgb(88, 121, 161);
      overflow: hidden;
      border-radius: 30px;
      box-sizing: border-box;
  
  
      .current-process {
        background: #049DFB;
        height: 100%;
        overflow: hidden;
        border-radius: 30px;
        position: absolute;
        left: 0;
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

    .process-icon{
        position: absolute;
        left: 54px;
        top: 41px;
        .icon{
            width: 49.25px;
            height: 48.98px;
        }
    }
  
  }
  </style>
  
  