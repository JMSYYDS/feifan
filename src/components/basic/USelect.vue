<template>
  <div class="container">
    <div class="desc" v-if="description">
      {{ description }}
      <svg-icon iconClass="ic_lightControl"
                class="icon-detail"
                v-if="isInfo"
      ></svg-icon>
    </div>

    <div class="nav-warp" v-if="selectList.length !== 0">
      <div
          class="nav-item"
          v-for="(item, index) in selectList"
          :key="index"
          @click="choose(index)"
          :style="{width:itemWidth+'%'}"
      >
        <svg-icon
            :iconClass="item.itemContent"
            :class="item.className"
            v-if="item.isIcon"
        ></svg-icon>
        <div v-else class="recommendContainer">{{ item.itemContent }}<div v-if="item.isRecommend" class="recommend">推荐</div></div>
      </div>
      <div class="nav-item-bg" ref="navItemBg"
           :style="{
              width:itemWidth+'%',
              background : isDisabled ? '#167BC0' : '',
              left : localIndex * this.itemWidth + '%'
            }"
      ></div>
      <div class="maskBg" v-if="showBg"></div>
    </div>
  </div>

</template>
<script>
export default {
  name: "USelect",
  props: {
    selectList: Array,
    showBg: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: ''
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    isInfo: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      itemWidth: null,
      localIndex: 0,
    };
  },
  methods: {
    choose(index) {
      this.localIndex = index
      // this.$refs.navItemBg.style.left = index * this.itemWidth + "%";
      this.$emit("choose", index)
    },
  },
  watch : {
    currentIndex:{
      handler : function(newVal){
        this.localIndex = newVal
      },
      immediate: true
    }
  },
  mounted() {
    const length = this.selectList.length;
    this.itemWidth = 100 / length;
    this.$refs.navItemBg.style.left = this.localIndex * this.itemWidth + "%";
  }
};
</script>
<style scoped lang="scss">
$item-width: 33.33%;
$item-height: 64px;
$item-padding: 6px;

.container {
  height: $item-height;
  border-radius: 18px;

  box-sizing: border-box;
  background: rgba(58, 58, 58, 0.3);
}

.nav-warp {
  width: 100%;
  height: $item-height;
  padding-left: $item-padding / 2;
  padding-right: $item-padding / 2;
  box-sizing: border-box;
  position: relative;
  display: flex;
}

.nav-item {
  width: $item-width;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.nav-item-bg {
  border-radius: 18px;
  width: $item-width;
  height: $item-height - $item-padding;
  background: #2AA9F9;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 0;
  transition-property: left;
  transition-duration: 0.5s;
}

.icon1 {
  width: 32.34px;
  height: 22.82px;
}

.icon2 {
  width: 25.5px;
  height: 26.87px;
}

.maskBg {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  border-radius: 18px;

}

.desc {
  font-size: 12px;
  margin: 12px 0;
  display: flex;
  align-items: center;
}

.icon-detail {
  margin-left: 12px;
  width: .20rem;
  height: .18rem;
}

.recommendContainer {
  display: flex;
  position: relative;
  .recommend {
    position: absolute;
    font-size: 12px;
    // 强制缩小50%
    transform: scale(0.5);
    color: #A5AFC1;
    white-space: nowrap;
    right: -66px;
    bottom: -8px;
  }

}

.ic_d {
  font-size: 68px;
}

.ic_b {
  font-size: 45px;
}

</style>
