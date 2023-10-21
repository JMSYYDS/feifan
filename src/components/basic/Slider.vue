
<template>
  <div class="slider" :style="{ width: $px2vw(width), height: $px2vw(height) }" @touchstart="onTouchStart"
    @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="slider-bar" ref="sliderBar" :style="{ background: scolor }">
      <div class="slider-track" :style="{ width: trackWidth + 'px', background: bcolor }"></div>
      <div class="slider-knob" :style="{
        left: knobPosition + 'px',
        width: $px2vw(cwidth),
        height: $px2vw(cheight),
        background: bcolor,
      }"></div>
    </div>
    <!--    <div class="energy-persent">{{ Math.round(percentage) }}%</div>-->
  </div>
</template>

<script>
export default {
  name: 'EnergyBar',
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 10,
    },
    cwidth: {
      type: Number,
      default: 30,
    },
    cheight: {
      type: Number,
      default: 30,
    },
    bcolor: {
      type: String,
      default: '#fff',
    },
    scolor: {
      type: String,
      default: '#ccc',
    },
    beforePercent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      knobPosition: 0,
      // knobWidth: 30,
      isDragging: false,
      startY: 0,
      totalWidth: 0, //总条长
      percentage: 0, //滑动距离占总长的百分比
      distance: 0, //实时滑动距离
    }
  },
  computed: {
    trackWidth() {
      return this.knobPosition
    },
  },
  mounted() {
    ; (this.totalWidth = this.$refs.sliderBar.offsetWidth - this.cwidth / 2),
      (this.percentage = this.beforePercent),
      (this.knobPosition =
        (this.$refs.sliderBar.offsetWidth - this.cwidth / 4) * (this.beforePercent / 100))
  },
  methods: {
    onTouchStart(event) {
      this.isDragging = true
      this.startY = event.touches[0].pageY
    },
    onTouchMove(event) {
      if (this.isDragging) {
        const deltaX = event.touches[0].pageY - this.startY
        const newX = this.knobPosition + deltaX
        if (newX >= 0 && newX <= this.$refs.sliderBar.offsetWidth - this.cwidth / 4) {
          this.knobPosition = newX
          // 计算滑动距离占总长的百分比
          this.percentage = Math.min(100, (newX / this.totalWidth) * 100)
          this.$emit('HowPercent', this.percentage)
          // console.log('滑动了' + this.percentage + '%')
          // 计算实时滑动距离
          this.distance = newX
          // console.log('滑动了' + this.distance + '的距离')
        }
        this.startY = event.touches[0].pageY
      }
    },
    onTouchEnd() {
      this.isDragging = false
    },
  },
}
</script>

<style scoped>
.slider {
  border-radius: 90px;

  //width: 100%;
  //width: 300px;
  //height: 10px;
  position: relative;
  background-color: white;
}

.slider-bar {
  border-radius: 90px;
  width: 100%;
  height: 100%;
  //background-color: #ccc;
  position: relative;
}

.slider-track {
  height: 100%;
  border-radius: 90px;

  //background-color: #007bff;
}

.slider-knob {
  //width: 30px;
  //height: 30px;
  //background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  //border: 2px solid #fff; /* 白色的圆形边框 */
}

.energy-persent {
  color: white;
}
</style>

    