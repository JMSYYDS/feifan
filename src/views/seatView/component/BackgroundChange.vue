<template>
    <div class="bgchange" @click="change = !change"
        :class="{ 'bg-active1': change && !judge, 'bg-active2': change && judge }">
    </div>
</template>
<script>
export default {
    props: ['judge'],
    data() {
        return {
            change: false
        }
    }
}
</script>
<style scoped lang="scss">
.bgchange {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    background: #67688E;
    position: absolute;
    left: 1349px;
    top: 1093px;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 65px;
        height: 65px;
    }
}

.bg-active1 {
    background: #EC9B42;
    box-shadow: 0px 0px 50px 8px
}

.bg-active2 {
    background: #4192F7;
    box-shadow: 0px 0px 50px 8px rgba(65, 146, 247, 0.8);
}
</style>