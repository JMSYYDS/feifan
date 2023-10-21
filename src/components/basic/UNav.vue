<template>
  <nav class="navbar">
    <div class="navbar__brand" v-if="brand">
      <span class="navbar__brand-link">{{ brand }}</span>
    </div>
    <ul class="navbar__links">
      <li
        v-for="(item, index) in items"
        :class="['navbar__link-item',{'item-large' : isLarge}]"
        :key="index"
        @click="selectItem(index)"
        :style="{
          margin: `0 ${marginRight}`,
        }"
      >
        <span
          :style="{
            // borderBottom:
            //   showBorder && index === activeIndex
            //     ? '0.0366rem solid #00e2de'
            //     : 'none',
            color: isActive && index === activeIndex ? '#F5F6F8' : '#FAFAFB',
            fontWeight : isActive ? 'bold' : ''
            }"
        >
          {{ item.text }}
        </span>

        <div class="bottomLine"
          :style="{
            backgroundColor: index === activeIndex ? '#FDFDFE' : ''
          }"
        >
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "UNav",
  props: {
    brand: {
      type: String,
      defaultValue: "",
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      defaultValue: 0,
    },
    marginRight: {
      type: String,
      defaultValue: 0,
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isLarge : {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    selectItem(index) {
      this.$emit("item-selected", index);
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: auto;
}

.navbar__brand-link {
  font-weight: bold;
  color: #333;
}

.navbar__links {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;


}

.navbar__link-item {
  margin-right: 40px;
  height: auto !important;
  color: #d9d9d9;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .bottomLine {
    margin-top: 8px;
    width: 39.7px;
    height: 5.65px;
    border-radius: 2.93px;
    opacity: 1;
  }

}

.item-large {
  font-size: 46px;
  font-weight: normal;
  line-height: 69px;
  color: #FFFFFF;
}

.navbar__link-item:last-child {
  margin-right: 0;
}
</style>
