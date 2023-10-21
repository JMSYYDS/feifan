<template>
  <nav class="UPage" v-show="visible">
    <div class="header">
      <svg-icon icon-class="ic_return" class="back" @click="hide"></svg-icon>
      <div class="title">
        {{ title }}
      </div>
    </div>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: "UPage",
  data() {
    return {
      visible: false
    }
  },
  props: {
    title: {
      type: String,
      defaultValue: "",
    },
    bgUrl: {
      type: String,
      defaultValue: "",
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
      this.$emit('close')
    }
  },
};
</script>

<style scoped lang="scss">
.UPage {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 140px 72px;
  box-sizing: border-box;
  z-index: 999;

  .header {
    display: flex;
    align-items: center;
    font-size: 50px;
    font-weight: 500;
    color: #FCFCFC;

    .back {
      width: 22px;
      height: 36.5px;
      margin-right: 56px;
      margin-left: 84px;
      z-index: 3;
    }
  }

  .body {
    width: 100%;
  }


}
</style>
