<template>
  <div class="xiPing" @click="$router.push('/home')">
  </div>
</template>

<script>
export default {
    name: "xiPing",
}
</script>

<style lang="scss" scoped>
.xiPing {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/dropdown/xiping.png");
    background-size: 100% 100%;
}
</style>