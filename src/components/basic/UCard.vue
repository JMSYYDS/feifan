<template>
  <div
    :class="[
      'card',
      { highlighted: isHighLighted, clickable: isClickable, shadow: shadow },
    ]"
    :style="{
      width:$px2vw(cardWidth),
      height: $px2vw(cardHeight),
      background: backgroundColor,
    }"
    @click="toggleHighlight"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UCard",
  data() {
    return {
      isHighlighted: false,
    };
  },
  props: {
    isClickable: {
      type: Boolean,
      default: false,
    }, // 是否可以点击
    cardWidth: {
      type: Number,
      default: 200,
    }, // 卡片宽度
    cardHeight: {
      // type: Number,
      default: 100,
    }, // 卡片高度
    shadow: {
      type: Boolean,
      default: false,
    }, // 是否显示阴影
    isHighLighted : {
      type: Boolean,
      default: false,
    },// 是否高亮显示
    backgroundColor :{
      type: String,
    }
  },
  methods: {
    toggleHighlight() {
      this.$emit("toggle")
    },
  },
};
</script>

<style scoped lang="scss">
$cardBgColor: rgba(255,255,255, 0.35); //  卡片背景色
$boxShadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); // 卡片阴影

.card {
  background-color: $cardBgColor;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  margin: 10px;
  color: #F6F7F8;
}

.highlighted {
  background-color: #009DFF;
}

.card.clickable {
}

.shadow {
  box-shadow: $boxShadow;
}
</style>
