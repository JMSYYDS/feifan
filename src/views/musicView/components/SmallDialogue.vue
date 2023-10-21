<template>
    <div class="dialogue">
        <slot></slot>
    </div>
</template>
<script>
export default {

    data() {
        return {

        }
    }
}
</script>
<style scoped lang="scss">
.dialogue {
    position: absolute;
    width: 500px;
    height: 132px;
    border-radius: 30px;
    opacity: 1;
    background: #000000;
    z-index: 3;
    font-family: HarmonyOS Sans SC;
    font-size: 36px;
    font-weight: 500;
    line-height: 132px;
    letter-spacing: 0em;
    font-feature-settings: "kern" on;
    color: #FEFEFE;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>