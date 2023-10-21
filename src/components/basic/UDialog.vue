<!-- Dialog.vue -->
<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-box" :style="{
      width : px2vw(dialogWidth),
      height : px2vw(dialogHeight),

    }">
      <div class="content">
        <div class="header">
          <div class="close" v-if="showClose">
            <svg-icon icon-class="dialog_close"
                      class="dialog-close"
                      @click="closeHandler"
            ></svg-icon>
          </div>
          <div class="title">
            {{ title }}
          </div>
        </div>
        <div class="line" v-if="showLine"></div>
        <div class="body">
          <slot></slot>
        </div>

        <div class="bottom" v-if="!hiddeBottom">
          <slot name="bottom">
            <!-- 默认是两个按钮，如果需要自定义按钮，请使用插槽bottom。-->
            <UButton
                :type="isDanger ? 'danger' : 'primary'"
                class="bottomButton"
                @clickHandler="confirmHandler"
                :disabled="banConfirm"
            >{{ isDanger ? closeContext : confirmContext }}
            </UButton
            >
            <UButton class="bottomButton" @clickHandler="cancelHandler">{{
                cancelContext
              }}
            </UButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UButton from "@/components/basic/UButton.vue";
import {px2vw} from "@/utils/px2vw";

export default {
  name: "UDialog",
  components: {UButton},
  data() {
    return {};
  },
  methods: {
    px2vw,
    confirmHandler() {
      this.$emit("confirmHandler");
    }, // 确定事件
    cancelHandler() {
      this.$emit("cancelHandler");
    }, // 取消事件
    closeHandler() {
      this.$emit("closeHandler")
    }
  },
  props: {
    title: {
      type: String,
      default: "",
    }, // dialog标题
    showLine: {
      type: Boolean,
      default: false,
    }, // 是否显示分割线
    showClose: {
      type: Boolean,
      default: false,
    }, // 是否显示关闭
    isDanger: {
      type: Boolean,
      default: false,
    }, // 是否显示关闭
    visible: {
      type: Boolean,
      default: false,
    }, // 是否显示dialog
    confirmContext: {
      type: String,
      default: "确定",
    }, // 确定按钮文字
    closeContext: {
      type: String,
      default: "关闭",
    }, // 关闭按钮文字
    cancelContext: {
      type: String,
      default: "取消",
    }, // 取消按钮文字
    hiddeBottom : {
      type: Boolean,
      default: false,
    },// 是否隐藏Bottom
    dialogWidth :{
      type : String,
    }, // dialog的宽度
    dialogHeight : {
      type : String
    },// dialog的高度
    banConfirm : {
      type: Boolean,
      default: false,
    },// 是否禁用confirm键
  },
  watch: {},
  created() {
  }
};
</script>

<style scoped lang="scss">
$dialogBgColor: rgba(255, 255, 255, 0.3); // dialog的背景色
$dialogOpacity: 0.3; // dialog透明度
$dialogRadius: 49px; // dialog圆角
$fontColor: #fff; // 字体颜色
$titleSize: 40px; // 标题字体大小
$fontSize: 35px; // 内容字体大小
$gapDistance: 24px; // 按钮间的距离
$lineColor: #171e22; // 分割线颜色

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .85);
  transform: rotateX(0);
  z-index: 999;
}

.dialog-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 66px 66px 24px 66px;
  text-align: center;
  color: $fontColor;
  z-index: 9999;
  background-color: $dialogBgColor;

  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: $dialogRadius;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 9;
    font-size: 30px;
  }

  .header {
    position: relative;
    .title {
      font-size: $titleSize;
    }

    .dialog-close {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0,-50%);
      width: 32px;
      height: 32px;
    }
  }

  .line {
    height: 1px;
    width: 100%;
    background: $lineColor;
    margin-top: 24px;
  }

  .body {
    font-size: $fontSize;
    margin-top: 24px;
  }

  .bottom {
    margin-top: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $gapDistance;

    .bottomButton {
      flex: 1;
    }
  }
}
</style>
