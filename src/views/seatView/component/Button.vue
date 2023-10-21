<template>
    <div class="button">


    </div>
</template>
<script>
export default {
    data() {
        return {
            isClick: false
        }
    }
}
</script>
<style scoped lang="scss">
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 239px;
    height: 93px;
    border-radius: 22px;
    background: #3F4664;

    img {
        width: 36px;
        height: 36px;
    }
}

.button-active {
    background: #009DFF;
}
</style>