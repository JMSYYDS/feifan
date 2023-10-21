<!-- Button.vue -->
<template>
  <div
      class="button"
      :class="[typeClass, roundClass, disabledClass,sizeClass]"
      @click="clickHandler"
      ref="button"
      :style="{
        background : isClicked ? '#009DFF' : ''
      }"
  >
    <svg-icon :icon-class="iconName" class="icon" v-if="size === 'icon'"></svg-icon>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UButton",
  data () {
    return {
      clicked: false
    }
  },
  props: {
    type: {
      type: String,
      default: "default",
    }, // 类型 default/primary/success/warning/danger
    round: {
      type: Boolean,
      default: false,
    }, // 是否是圆角
    disabled: {
      type: Boolean,
      default: false,
    }, // 是否禁用
    size: {
      type: String,
      default: "default",
    },// 按钮大小
    iconName: {},
    isClickable:{
      type: Boolean,
      default: false,
    },
    isClicked : {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    typeClass() {
      return `button-${this.type}`;
    }, // 类型样式
    roundClass() {
      return this.round ? "round" : "";
    }, // 圆角样式
    disabledClass() {
      if (this.type === 'danger') return this.disabled ? "danger-disabled" : ""
      return this.disabled ? "disabled" : "";
    }, // 禁止样式
    sizeClass() {
      return this.size === 'icon' ? "icon-class" : "";
    }, // 尺寸样式

  },
  methods : {
    clickHandler() {
      if (this.isClickable && this.type === 'default') {
        this.clicked = !this.clicked
        this.$refs.button.style.background =  this.clicked ? '#009DFF' : ''
      }
      this.$emit('clickHandler',this.clicked)
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  border: none;
  border-radius: 16px;
  padding: 16px 16px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

// 按钮默认样式
.button-default {
  background-color: rgba($color:#7A89A5,$alpha:0.3);
  color: #FCFCFC;
  //border: 1px solid #dcdfe6;
}

// 默认hover样式
//.button-default:hover {
//  background-color: #ecf5ff;
//  //border-color: #b3d8ff;
//  color: #409eff;
//}

// 按钮primary样式
.button-primary {
  background-color: #4499F5;
  color: #FCFCFC;
}

// 按钮success样式
.button-success {
  background-color: #67c23a;
  color: #f5faff;
}

// 按钮warning样式
.button-warning {
  background-color: #e6a23c;
  color: #f5faff;
}

// 按钮danger样式
.button-danger {
  background-color: #FF2401;
  color: #f5faff;
}

// 圆角样式
.round {
  border-radius: 24px;
}

// 禁止样式
.disabled {
  // 禁止所有事件
  pointer-events: none;
  // 整体颜色变淡
  opacity: 0.5;
}
.danger-disabled {
  background-color: #95456A;
  color: #f5faff;
  // 禁止所有事件
  pointer-events: none;
}
// icon大小样式
.icon-class {
  width: 126px;
  height: 126px;
  padding: 40px;
  box-sizing: border-box;

  .icon {
    width: 100%;
    height: 100%;
  }
}
</style>
