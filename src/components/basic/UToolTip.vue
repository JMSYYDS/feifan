<template>
  <div class="tooltip-wrapper">
    <div v-show="showTooltip" :class="['tooltip',positionClass]">
      <div class="tooltip-arrow-bottom" v-if="type === 'top'"></div>
      <div class="tooltip-arrow-top" v-if="type === 'bottom'"></div>
      <div class="tooltip-content">{{ content }}</div>
    </div>
    <div @click.stop="()=>{
       if(isDisabled) return
      showTooltip = !showTooltip
    }">
      <div class="slot-container">
        <slot></slot>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UTip",
  data() {
    return {
      showTooltip : false
    };
  },
  props: {
    content: {
      // type: [String, Number, Array, Object],
      required: true,
    },
    type : {
      type : String,
      default : 'top'
    },
    isDisabled :{
      type : Boolean,
      default : false
    }
    // showTooltip: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  computed:{
    positionClass(){
      return 'position-' + this.type
    }
  }
};
</script>

<style scoped lang="scss">
$bgColor : #000;
$frontSize : 26px;

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  //transform: rotateX(0);
}

.tooltip {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px 20px;
  background-color:$bgColor;
  color: #fff;
  font-size: $frontSize;
  border-radius: 16px;
  z-index: 99;

  max-width: 800px;
  word-break:keep-all;
  box-sizing: border-box;
}

.position-top {
  bottom: 100%;
  margin-bottom: 24px;

}

.position-bottom {
  top: 100%;
  margin-top: 24px;
}

.tooltip-arrow-bottom {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid $bgColor;
}

.tooltip-arrow-top {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid $bgColor;
}

.tooltip-content {
  //margin-top: 6px;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap:break-word;
  line-break: anywhere;
  min-width: 400px;
}

.slot-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
}
</style>
