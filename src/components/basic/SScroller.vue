<template>
  <div>
    <div class="f-flex f-flext scroll-select" @touchmove.prevent="" @mousewheel.prevent="">
      <div class="f-flex1 f-tac f-oh">
        <ul :class="{'dragging': dragging}" @touchstart.stop="handleTouchStart($event)" @mousedown.stop="handleTouchStart($event)" :style="{'transform' : 'translate3d(0,' + translateX + 'px, 0)'}">
          <li ref="li"></li>
          <li class="f-toe" v-for="(item, index) in options" :key="item.value" :class="{
                'current': currentOption ? item.value === currentOption.value : false,
                'node1':  Math.abs(index - currentIndex) == 1,
                'node2':  Math.abs(index - currentIndex) == 2,
                'node3':  Math.abs(index - currentIndex) >= 3
            }">{{item.text}}</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="net-monitor"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollSelect',
  props: {
    // 当前选中值
    value: [String, Number, Object],
    /**
     * 选择项列表数组
     * 数组中对象示例：{ value: '01'， text: '男'}
     *  value： 值
     *  text： 显示的文字
     **/
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 当前选中值的索引位置
      currentIndex: 0,
      // 当前选中值的选项信息，例：{ value: '01'， text: '男'}
      currentOption: {},
      dragging: false,
      distanceX: 0,
      translateX: 0
    }
  },
  watch: {
    value (val) {
      this.initValue(val)
      this.initTranslateX()
    },
    options (val) {
      if (val && val instanceof Array) {
        this.initValue(this.currentOption)
        this.initTranslateX()
      }
    }
  },
  created () {
    this.initValue(this.value)
  },
  mounted () {
    this.initTranslateX()
    if (typeof this.value === 'string' || typeof this.value === 'number') {
      this.$emit('change', this.currentOption)
    }
  },
  beforeDestroy () {
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('mousemove', this.handleTouchMove)
    document.removeEventListener('mouseup', this.handleTouchEnd)
  },
  methods: {
    initValue (value) {
      let currentIndex = 0
      let currentOption = this.options.length > 0 ? this.options[0] : null
      if (value !== null && typeof value !== 'undefined') {
        this.options.forEach((val, idx) => {
          if (typeof value === 'string' || typeof value === 'number') {
            if (val.value === value) {
              currentOption = val
              currentIndex = idx
            }
          } else if (val.value === value.value) {
            currentOption = val
            currentIndex = idx
          }
        })
      }
      this.currentIndex = currentIndex
      this.currentOption = currentOption
    },
    initTranslateX () {
      let clientHeight = this.$refs.li.offsetHeight
      this.translateX = -clientHeight * this.currentIndex
    },
    setPage () {
      let clientHeight = this.$refs.li.offsetHeight
      let total = this.options.length
      let goPage = Math.round((this.translateX / clientHeight).toFixed(1))
      if (goPage > 0) {
        goPage = 0
      }
      goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1)
      let index = Math.abs(goPage)
      this.currentOption = this.options[index]
      this.currentIndex = index
      this.translateX = goPage * clientHeight
      this.$emit('change', this.currentOption)
      this.$emit('input', this.currentOption.value)
    },
    getPageX (e) {
      return e.changedTouches ? e.changedTouches[0]['pageX'] : e['pageX']
    },
    handleTouchStart (e) {
      this.distanceX = 0
      this.startX = this.getPageX(e)
      this.startTranslateX = this.translateX
      this.dragging = true
      document.addEventListener('touchmove', this.handleTouchMove, false)
      document.addEventListener('touchend', this.handleTouchEnd, false)
      document.addEventListener('mousemove', this.handleTouchMove, false)
      document.addEventListener('mouseup', this.handleTouchEnd, false)
    },
    handleTouchMove (e) {
      this.distanceX = this.startX - this.getPageX(e)
      this.translateX = this.startTranslateX + this.distanceX
    },
    handleTouchEnd (e) {
      this.dragging = false
      this.setPage()
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('mousemove', this.handleTouchMove)
      document.removeEventListener('mouseup', this.handleTouchEnd)
    },
    // 获取默认值
    getDefaultValue (value) {
      if (this.options.length > 0) {
        return this.options[0]
      } else {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-select {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: transparent;
  height: 450px;
  overflow: hidden;
  color: #2D3859;

  ul {
    transition: all .4s ease;
    padding-top: 27px;
    &.dragging {
      transition: none;
    }
    li {
      line-height: 159px;
      height: 159px;
      font-size: 36px;
      text-align: center;
      color: #a8a8a8;
      transition: .3s ease;
      &.current {
        font-size: 106px;
        font-weight: 500;
        line-height: 159px;
        letter-spacing: -0.01em;

        font-feature-settings: "kern" on;
        color: #FFFFFF;
      }
      &.node1,&.node2,&.node3 {
        font-size: 70px;
        font-weight: 500;
        color: #FFFFFF;
        opacity: .7;
      }
    }
  }
}

.net-monitor {
  width: 100%;
  height: 94px;
  border: 1px solid #FFFFFF;
  border-left-width: 0;
  border-right-width: 0;
  position: absolute;
  bottom: 125px;
  z-index: -1;
}
.f-toe {
  overflow: hidden;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
