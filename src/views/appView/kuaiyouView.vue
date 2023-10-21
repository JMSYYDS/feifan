<template>
  <div class="aqi-view">
    <img src="../../assets/images/app/kuaiyou.png" class="bg">
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";

export default {
  name: 'aqiView',

  data() {
    return {
    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.aqi-view {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 80px;

  .bg {
    width: 100%;
    height: 100%;
  }

}
</style>
