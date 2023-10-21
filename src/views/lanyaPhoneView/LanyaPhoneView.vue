<template>
    <div class="lanya-phone">
        <img src="@/assets/lydh/image.png" alt="" class="lanya-bg">
        <div class="phone-nav">
            <div class="phone-nav-item" @click="lineShow = 1;">
                通话
                <img src="@/assets/lydh/985.png" alt="" class="img-left" v-show="lineShow === 1">
            </div>
            <div class="phone-nav-item" @click="lineShow = 2">
                联系人
                <img src="@/assets/lydh/985.png" alt="" class="img-right" v-show="lineShow === 2">
            </div>
        </div>
        <div class="lanya-phone-right" v-if="!overShow && !overMainShow">
            <img src="../../assets/lydh/lanya_right.png" alt="" @click="isLanyaModel = !isLanyaModel">
            <img v-if="isLanyaModel" src="../../assets/lydh/right_bg_model.png" alt="">
        </div>
        <img src="@/assets/lydh/87.png" alt="" class="search" @click="overMainShow = true">
        <div class="over-main" v-show="overMainShow">
            <img src="@/assets/lydh/30.png" alt="">
            <div class="delete" @click="overMainShow = false">
            </div>
        </div>
        <div class="overmian1" v-show="overShow" :class="{ 'overmian1-active': !actarShow }">
            <img src="@/assets/lydh/ic_suoxiao.png" alt="" class="scare" @click="overShow = false">
            <img src="@/assets/lydh/433.png" alt="" class="actar" v-if="actarShow">
            <img src="@/assets/lydh/465.png" alt="" class="no-actar" v-else>
            <div class="middle">
                <div class="first-line">15767439216</div>
                <div class="call">正在呼叫...</div>
                <div class="item">
                    <div class="middle-item">
                        <img src="@/assets/lydh/ic_jingyin.png" alt="" v-if="imgShow1" @click="imgShow1 = !imgShow1">
                        <img src="@/assets/lydh/ic_jingyin-no.png" alt="" v-else @click="imgShow1 = !imgShow1">
                        <span v-if="imgShow1">静音</span>
                        <span v-else>非静音</span>
                    </div>
                    <div class="middle-item">
                        <img src="@/assets/lydh/ic_shendao.png" alt="" v-if="imgShow2" @click="imgShow2 = !imgShow2">
                        <img src="@/assets/lydh/464.png" alt="" v-else @click="imgShow2 = !imgShow2">
                        <span v-if="imgShow2">车机声道</span>
                        <span v-else>手机声道</span>
                    </div>
                    <div class="middle-item">
                        <img src="@/assets/lydh/ic_jianpan.png" alt="" @click="actarShow = !actarShow">
                        <span>键盘</span>
                    </div>
                    <div class="middle-item">
                        <img src="@/assets/lydh/ic_tianjia.png" alt="">
                        <span>添加通话</span>
                    </div>
                </div>
                <img src="@/assets/lydh/444.png" alt="" class="red" @click="overShow = false">
            </div>
        </div>
        <div class="main" v-show="lineShow === 1">
            <img src="@/assets/lydh/4571.png" alt="" class="key" :style="{ opacity: per }">
            <div class="mouse-wheel-horizontal-scroll">
                <div class="mouse-wheel-wrapper" ref="scroll">
                    <div class="mouse-wheel-content">
                        <div class="item">
                            <div class="today">今天</div>
                            <div class="date">
                                2023/10/16
                            </div>
                            <div class="keyboard">
                                <div class="phone-number" v-show="phoneNumberShow">
                                    15767439216
                                    <img src="@/assets/lydh/111.png" alt="" class="number" @click="phoneNumberShow = false">
                                </div>
                                <img src="@/assets/lydh/465.png" alt="" class="number" @click="phoneNumberShow = true">
                                <img src="@/assets/lydh/446.png" alt="" class="phone" @click="overShow = true">
                            </div>
                            <div @click="overShow = true">
                                <img src="@/assets/lydh/449.png" alt="">
                                <img src="@/assets/lydh/450.png" alt="">
                                <img src="@/assets/lydh/451.png" alt="">
                                <img src="@/assets/lydh/455.png" alt="">
                                <img src="@/assets/lydh/456.png" alt="">
                                <img src="@/assets/lydh/457.png" alt="">
                                <img src="@/assets/lydh/458.png" alt="">
                                <img src="@/assets/lydh/459.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" v-if="lineShow === 2">
            <div class="mouse-wheel-horizontal-scroll">
                <div class="mouse-wheel-wrapper" ref="scrollS">
                    <div class="mouse-wheel-content">
                        <div class="item">
                            <div class="a">A</div>
                            <div @click="overShow = true">
                                <img src="@/assets/lydh/449.png" alt="">
                                <img src="@/assets/lydh/450.png" alt="">
                                <img src="@/assets/lydh/451.png" alt="">
                                <img src="@/assets/lydh/455.png" alt="">
                                <img src="@/assets/lydh/456.png" alt="">
                                <img src="@/assets/lydh/457.png" alt="">
                                <img src="@/assets/lydh/458.png" alt="">
                                <img src="@/assets/lydh/459.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="@/assets/lydh/460.png" alt="" class="character">
            <div class="a2">A</div>
        </div>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)
export default {
    data() {
        return {
            per: 0,
            actarShow: true,
            overShow: false,
            imgShow1: true,
            imgShow2: true,
            overMainShow: false,
            phoneNumberShow: false,
            lineShow: 1,
            isLanyaModel: false,
        }
    },
    mounted() {
        this.init()
        this.initS()
        // console.log('655555')
    },
    methods: {

        getBS() {
            this.initS()
            this.lineShow = 2
        },
        init() {
            this.bs = new BScroll(this.$refs.scroll, {
                quadrant: 2,
                probeType: 3,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                click: true
            })
            this.bs.on('scroll', (position) => {
                if (position.x < -1220) {
                    this.per = (position.x + 1300) / -3000
                }
            })
        },
        initS() {
            this.bs2 = new BScroll(this.$refs.scrollS, {
                quadrant: 2,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                click: true
            })
        }
    },
    updated() {
        this.initS()

    }
}
</script>
<style scoped lang="scss">
.lanya-phone {
    width: 100%;
    height: calc(100% - 168px);
    position: absolute;
    left: 0;
    top: 0;

    .over-main {
        position: absolute;
        z-index: 3;

        img {
            width: 2560px;
            height: 1430px;
        }

        .delete {
            width: 30px;
            height: 55px;
            position: absolute;
            left: 134px;
            top: 150px;
        }

    }

    .overmian1 {
        position: absolute;
        z-index: 2;
        backdrop-filter: blur(110px);
        width: 100%;
        height: 100%;

        .actar {
            position: absolute;
            width: 516px;
            height: 516px;
            left: 1828px;
            top: 512px;
        }

        .no-actar {
            position: absolute;
            width: 562px;
            height: 671px;
            left: 1753px;
            top: 371px;
        }

        .scare {
            position: absolute;
            width: 154px;
            height: 154px;
            left: 90px;
            top: 135px;
        }

        .middle {
            position: absolute;
            left: 578px;
            top: 400px;
            width: 894px;
            display: flex;
            flex-direction: column;
            align-items: center;


            .first-line {
                font-family: HarmonyOS Sans SC;
                font-size: 84px;
                font-weight: bold;
                line-height: 60.77px;
                letter-spacing: 0em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;

            }

            .call {
                font-family: HarmonyOS Sans SC;
                font-size: 52px;
                font-weight: 500;
                line-height: 60.77px;
                letter-spacing: -0.02em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;
                margin-top: 64px;
            }

            .item {
                margin-top: 114px;
                display: flex;
                justify-content: space-around;
                width: 100%;

                .middle-item {
                    font-family: HarmonyOS Sans SC;
                    font-size: 40px;
                    font-weight: normal;
                    line-height: 60.77px;
                    letter-spacing: 0.01em;
                    font-feature-settings: "kern" on;
                    color: #F6F7F9;
                    display: flex;
                    flex-direction: column;
                    align-items: center;


                    span {
                        margin-top: 39px;
                    }

                    img {
                        width: 173px;
                        height: 173px;

                    }
                }
            }

            .red {
                width: 164px;
                height: 164px;
                margin-top: 113px;
            }
        }
    }

    .overmian1-active {
        backdrop-filter: blur(70px);
    }

    .lanya-bg {
        position: absolute;
        width: 2560px;
        height: 1432px;

    }

    .phone-nav {
        position: absolute;
        top: 137px;
        left: 91px;
        font-size: 48px;
        font-weight: 500;
        line-height: 60.77px;
        letter-spacing: -0.04em;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
        display: flex;

        .phone-nav-item {
            position: relative;
            margin-right: 166px;

            img {
                position: absolute;
                width: 50px;
                height: 6px;

            }

            .img-left {
                top: 86px;
                left: 21px;
            }

            .img-right {
                top: 86px;
                left: 43px;
            }
        }
    }
    .lanya-phone-right{
        z-index: 10;
        position: absolute;
        right: 99px;
        top: 135px;
        width: 389.79px;
        height: 294.52px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            width: 100%;
            object-fit: contain;
        }
    }
    .search {
        width: 37px;
        height: 37px;
        position: absolute;
        left: 687px;
        top: 165px;
    }

    .main {
        position: absolute;
        width: 100%;
        height: 1083px;
        top: 300px;

        .key {
            width: 162px;
            height: 162px;
            position: absolute;
            left: 50px;
            top: 900px;
            opacity: 0;
        }

        .a2 {
            font-size: 44px;
            font-weight: normal;
            line-height: 60.77px;
            letter-spacing: -0.06em;
            font-feature-settings: "kern" on;
            color: #FFFFFF;
            position: absolute;
            left: 150px;
            top: 950px;
        }
    }

    .character {
        width: 2383px;
        height: 86px;
        margin-top: 194px;
        margin-left: 95px;


    }

    .mouse-wheel-horizontal-scroll {
        .mouse-wheel-wrapper {
            width: 100%;
            height: 100%;
            white-space: nowrap;

            border-radius: 5px;
            overflow: hidden;

            .mouse-wheel-content {
                display: inline-block;


                .keyboard {
                    display: inline-block;
                    margin-left: 181px;
                    width: 562px;
                    margin-right: 227px;
                    text-align: center;

                    .number {
                        width: 562px;
                        height: 672px;
                        margin-top: 162px;
                    }

                    .phone {
                        width: 164px;
                        height: 164px;
                        display: block;
                        margin-top: 50px;
                        margin-left: 242px;
                    }

                    .phone-number {
                        font-family: HarmonyOS Sans SC;
                        font-size: 52px;
                        font-weight: 500;
                        line-height: 60.77px;
                        letter-spacing: 0.06em;
                        font-feature-settings: "kern" on;
                        color: #FFFFFF;
                        position: absolute;
                        left: 305px;
                        top: 50px;

                        img {
                            position: absolute;
                            width: 78px;
                            height: 50px;
                            left: 475px;
                            top: -153px;

                        }

                    }
                }

                .item {
                    display: inline-block;
                    display: flex;
                    position: relative;

                    .a {
                        font-family: HarmonyOS Sans SC;
                        font-size: 44px;
                        font-weight: normal;
                        line-height: 60.77px;
                        letter-spacing: -0.06em;
                        font-feature-settings: "kern" on;
                        color: #7c7a7a;
                        position: absolute;
                        left: 60px;
                        top: 100px;

                    }

                    .today {
                        position: absolute;
                        font-family: HarmonyOS Sans SC;
                        font-size: 46px;
                        font-weight: 500;
                        line-height: 60.77px;
                        letter-spacing: -0.06em;
                        font-feature-settings: "kern" on;
                        color: #FFFFFF;
                        top: 75px;
                        left: 1050px;
                    }

                    .date {
                        position: absolute;
                        font-family: HarmonyOS Sans SC;
                        font-size: 44px;
                        font-weight: 500;
                        line-height: 60.77px;
                        letter-spacing: 0.02em;
                        font-feature-settings: "kern" on;
                        color: #FFFFFF;
                        top: 75px;
                        left: 2090px;
                    }

                    img {
                        display: inline-block;
                        margin: 184px 0 0 40px;
                        width: 466px;
                        height: 650px;
                    }

                }
            }
        }
    }
}
</style>
