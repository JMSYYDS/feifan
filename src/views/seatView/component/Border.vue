<template>
    <div class="border" @click="handle()">
        <div class="item" v-for="item in 4" v-show="def === item">
            <slot :name="item"></slot>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            def: 1
        }
    },
    methods: {
        handle() {
            this.def++
            if (this.def > 4) {
                this.def = 1
            }
        }
    }
}
</script>
<style scoped lang="scss">
.border {
    width: 138px;
    height: 138px;
    border-radius: 50%;
    position: absolute;

    .item {
        position: absolute;
        width: 138px;
        height: 138px;
        border-radius: 50%;
    }

    .ic {
        width: 309px;
        height: 309px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    img {
        width: 138px;
        height: 138px;
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .item1 {
        z-index: 1;
    }



}
</style>