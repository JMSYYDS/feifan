<template>
  <div class="screenClear">
    <img src="../../assets/images/car/system/screen_clear.png" alt="">
    <div class="quit" @click="$router.push('/home')"></div>
  </div>
</template>

<script>
export default {
name: "screenClear",
}
</script>

<style lang="scss" scoped>
.screenClear{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 1110px;
        object-fit: contain;
    }
    .quit{
        position: absolute;
        left: 1071px;
        bottom: 410px;
        width: 415px;
        height: 100px;
    }
}
</style>