<template>
  <div class="switchContainer">
    <div
        class="switch"
        @click.stop="toggleSwitch"
        :class="value ? 'active' : ''"
    >
      <div class="checkbox"
           :style="{
              background : this.isDisabled ? '#9BABCE' : ''
           }"
      ></div>
      <label :for="id" :class="['switch-label', typeBgClass]"></label>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "USwitch",
  props: {
    value: {
      type: Boolean,
      required: true,
    }, // 控制开关状态的prop
    id: String, // 唯一标识符
    type: {
      type: String,
      default: "default",
    }, // 类型，default, primary, success
    bgColor: {
      type: String,
      default: "#607d8e",
    }, // 自定义背景颜色
    boxColor: {
      type: String,
      default: "#d6dadd",
    }, // 自定义按钮颜色
    activeColor: {
      type: String,
      default: "#00e2de",
    }, // 自定义背景颜色
    label: {
      type: String,
      default: "",
    }, // 开关标签内容
    isDisabled: {
      type: Boolean,
      default: false,
    }, // 是否禁用
    isChangeable : {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    toggleSwitch() {
      if (this.isDisabled) return
      if (!this.isChangeable) {
        this.$emit("input", this.value);
        return;
      }
      this.$emit("input", !this.value);
      // console.log(!this.value)
    },
  },
  computed: {
    typeBgClass() {
      return this.value
          ? `u-switch-active-${this.type}`
          : `u-switch-background-${this.type}`;
    },
  },
};
</script>

<style scoped lang="scss">
$checkBoxWidth: 43px; // Checkbox宽度
$checkBoxHeight: 43px; // Checkbox高度
$labelWidth: 100px; // 标签宽度
$labelHeight: 57px; // 标签高度
$gap: 6px; // 标签和复选框之间的间距
$labelColor: #424345; // 标签字体颜色
$boxPadding: 7px; // 内边距
/* 可以根据需要添加样式 */

.switchContainer {
  white-space: nowrap;
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  gap: $gap;

  .switch {
    position: relative;
    display: inline-block;
    width: $labelWidth;
    height: $labelHeight;
  }

  .label {
    display: inline-block;
    color: $labelColor;
  }
}

.checkbox {
  height: $checkBoxWidth;
  width: $checkBoxHeight;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  left: $boxPadding;
  top: 50%;
  transform: translate(0, -50%);
  transition-property: left;
  transition-duration: 0.5s;
}

.switch-label {
  position: absolute;
  top: 0;
  left: 0;
  width: $labelWidth;
  height: $labelHeight;
  background: #8197C8;
  border-radius: $labelHeight / 2;
  //cursor: pointer; // 针对触摸屏不建议添加此属性
  transition-property: background;
  transition-duration: 0.5s;
}

.active .checkbox {
  left: $labelWidth - $checkBoxWidth - $boxPadding;
}

// 主要背景样式
.u-switch-background-primary {
  background: #dcdfe6;
}

// 主要被激活背景样式
.u-switch-active-primary {
  background: #409eff;
}

// 默认背景样式
.u-switch-background-default {
  background: #6B7D9F;
}

// 默认被激活背景样式
.u-switch-active-default {
  background: #009DFF;
}

// 成功背景样式
.u-switch-background-success {
  background: #ff4949;
}

// 成功激活背景样式
.u-switch-active-success {
  background: #13ce66;
}
</style>
