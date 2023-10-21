<template>
    <div class="wifi-view">
        <img src="../../assets/images/view/wifi_bg.png">
        <svg-icon iconClass="ic_close" class="ic_close" @click="handleClose"></svg-icon>
    </div>
</template>

<script>
export default {
    name: 'QicheCliWifiView',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        handleClose() {
            this.$router.push("/home")
        }
    },
};
</script>

<style lang="scss" scoped>
.wifi-view{
    position: relative;
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
    }

    .ic_close{
        position: absolute;
        top: 257px;
        left: 494px;
        width: 31.5px;
        height: 31.5px;
    }
}
</style>