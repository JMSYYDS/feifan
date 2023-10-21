<template>
  <div
      :class="[
      'card',
      { highlighted: highLight, shadow: shadow },
    ]"
      :style="{
      width: $px2vw(cardWidth),
      height: $px2vw(cardHeight),
    }"
      @click="toggleHighlight"
  >
    <slot>
      <svg-icon :icon-class=iconName class="icon">

      </svg-icon>
      <div class="name">
        {{ name }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "UButtonCard",
  data() {
    return {
      isHighlighted: false,
    };
  },
  props: {
    isClickable: {
      type: Boolean,
      default: true,
    }, // 是否可以点击
    cardWidth: {
      type: Number,
      default: 233,
    }, // 卡片宽度
    cardHeight: {
      type: Number,
      default: 233,
    }, // 卡片高度
    shadow: {
      type: Boolean,
      default: false,
    }, // 是否显示阴影
    isHighlighted: {
      type: Boolean,
      default: false,
    },// 是否高亮显示
    iconName:{
      type: String,
    },
    name : {
      type: String,
    }
  },
  computed:{
    highLight(){
      return this.isHighlighted
    }
  },
  methods: {
    toggleHighlight() {
      if (this.isClickable) {
        this.highLight = !this.highLight;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$cardBgColor: rgba($color: #fff, $alpha: 0.3); //  卡片背景色
$boxShadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); // 卡片阴影

.card {
  background-color: $cardBgColor;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: background-color 0.3s ease;
  margin: 10px;
  color: #F6F7F8;

  .icon {
    width: 64px;
    height: 64px;
    margin-bottom: 48px;
    margin-top: 24px;
  }

  .name{
    font-size: 24px;
  }
}

.card.highlighted {
  background-color: #009CFD;
}

.card.clickable {
}

.shadow {
  box-shadow: $boxShadow;
}
</style>
