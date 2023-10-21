<template>
    <div class="music-view">
        <div class="dialogue-show" v-show="dialogShow">
            <SmallDialogue>
                <template>
                    {{ dialogueList[imgNumber - 1] }}
                </template>
            </SmallDialogue>
        </div>
        <div class="music-view-left" v-if="detail">
            <img src="@/assets/music/94.png" alt="" class="img1" @click="detail = false">
            <img src="@/assets/music/6.png" alt="" class="img2" v-if="heartShow" @click="heartShow = !heartShow">
            <img src="@/assets/music/7.png" alt="" class="img2" v-else @click="heartShow = !heartShow">
            <div class="middle-music">
                <img src="@/assets/music/88.png" alt="" class="outline">
                <img :src="musicList[count].img" alt="" class="inline">
            </div>
            <div class="inner-text">
                <div class="inner-text-first">{{ musicList[count].muisc }}</div>
                <div class="inner-text-second">
                    <span>{{ musicList[count].singer }}<img src="@/assets/music/59.png" alt=""></span>
                </div>
                <div class="inner-text-third">{{ musicList[count].song }}</div>
            </div>
            <div class="progress-bar">
                <span class="span-left">00:10</span>
                <span class="span-right">04:06</span>
                <div class="bar">
                    <img src="@/assets/music/90.png" alt="">
                </div>
            </div>
            <div class="music-view-bottom">
                <img src="@/assets/music/ic_xunhuan.png" alt="" class="img1" v-show="imgNumber === 1" @click="changeText">
                <img src="@/assets/music/381.png" alt="" class="img1 img12" v-show="imgNumber === 2" @click="changeText">
                <img src="@/assets/music/ic_shuiji.png" alt="" class="img1 img13" v-show="imgNumber === 3"
                    @click="changeText">
                <img src="@/assets/music/ic_playleft.png" alt="" class="img2" @click="countf(-1)">
                <img src="@/assets/music/ic_play.png" alt="" class="img3" v-if="isPlay" @click="isPlay = !isPlay">
                <img src="@/assets/music/ic_bof.png" alt="" class="img3" v-else @click="isPlay = !isPlay">
                <img src="@/assets/music/ic_playright.png" alt="" class="img4" @click="countf(1)">
                <img src="@/assets/music/ic_caidan.png" alt="" class="img5">
            </div>
        </div>
        <div class="music-view-right" v-if="detail">

            <div class="music-view-right-nav">
                <div class="nav-item-first" @click="selectShow = true" ref="select">
                    {{ innerText }}
                    <img src="@/assets/music/19.png" alt="">
                    <div class="select" v-show="selectShow">
                        <div class="select-item" :class="{ 'select-item-active': show === 'wangyi' }"
                            @click="show = 'wangyi'; innerText = '网易云音乐'">网易云音乐
                        </div>
                        <div class="select-item" :class="{ 'select-item-active': show === 'kuwo' }"
                            @click="show = 'kuwo'; innerText = '酷我音乐'">
                            酷我音乐
                        </div>
                        <div class="select-item" :class="{ 'select-item-active': show === 'lanya' }"
                            @click="show = 'lanya'; innerText = '蓝牙音乐'">蓝牙音乐
                        </div>
                        <div class="select-item" :class="{ 'select-item-active': show === 'usb' }"
                            @click="show = 'usb'; innerText = 'USB音乐'">
                            USB音乐</div>
                    </div>
                </div>
                <div class="nav-item nav-item-left" :class="{ 'nav-item-active': active === 1 }"
                    @click="active = 1; show = 'xima'">
                    喜马拉雅
                </div>
                <div class="nav-item" :class="{ 'nav-item-active': active === 2 }" @click="active = 2; show = 'diantai'">
                    电台
                </div>
                <img src="@/assets/music/35.png" alt="" class="search">
            </div>
            <div class="music-view-right-music">
                <img src="@/assets/music/wangyi.png" alt="" v-show="show === 'wangyi'">
                <img src="@/assets/music/xima.png" alt="" v-show="show === 'xima'">
                <img src="@/assets/music/diantai.png" alt="" v-show="show === 'diantai'">
                <img src="@/assets/music/kuwo.png" alt="" v-show="show === 'kuwo'">
                <img src="@/assets/music/lanya.png" alt="" v-show="show === 'lanya'">
                <img src="@/assets/music/usb.png" alt="" v-show="show === 'usb'">
            </div>
        </div>
        <div class="other" v-else>
            <img src="@/assets/music/zjl.png" alt="" class="zjl">
            <div class="exit" @click="detail = true">

            </div>
        </div>

    </div>
</template>

<script>
import SmallDialogue from './components/SmallDialogue.vue'
export default {
    name: 'QicheCliMusicView',
    components: {
        SmallDialogue
    },
    data() {
        return {
            dialogShow: false,
            count: 0,
            detail: true,
            isPlay: true,
            innerText: '网易云音乐',
            selectShow: false,
            show: 'wangyi',
            active: 1,
            timer: null,
            heartShow: true,
            imgShow: false,
            textNumber: -1,
            imgNumber: 1,
            dialogueList: [
                '已切换到列表循环模式',
                '已切换到单曲循环模式',
                '已切换到随机播放模式'
            ],
            musicList: [
                {
                    muisc: '说好的幸福呢',
                    singer: '周杰伦',
                    song: '回话凌乱着',
                    img: require('@/assets/music/89.png')
                },
                {
                    muisc: '等你下课',
                    singer: '周杰伦',
                    song: '我租了一间公寓',
                    img: require('@/assets/music/891.png')
                }
            ]
        };
    },
    created() {
        document.addEventListener('click', this.onClickOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.onClickOutside)
    },
    mounted() {

    },
    beforeDestroy() {
        if (this.timer) {
            this.timer = null
        }
    },
    methods: {
        countf(n) {
            this.count += n
            if (this.count < 0) {
                this.count = 0
            } else if (count > this.musicList.length - 1) {
                this.count = this.musicList.length - 1
            }

        },

        changeText() {
            this.dialogShow = true
            this.imgNumber++
            if (this.imgNumber > 3) {
                this.imgNumber = 1
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.dialogShow = false

            }, 1500)

        },
        onClickOutside(e) {
            if (this.$refs.select && !this.$refs.select.contains(e.target)) {
                if (this.selectShow) {
                    this.selectShow = false
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.music-view {

    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/music/image.png");
    background-size: 100% 100%;
    padding: 132px 0 0 85px;
    box-sizing: border-box;

    .zjl {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 2560px;
        height: 1331px;
    }

    .exit {
        width: 67px;
        height: 67px;
        position: absolute;
        left: 135px;
        top: 195px;
    }

    img {
        position: absolute;
        top: 131px;
        width: 100%;
        height: 1239px;
    }

    .music-view-left {
        position: relative;
        width: 740px;
        height: 1239px;
        display: inline-block;
        border-radius: 44px;
        opacity: 1;
        background: linear-gradient(90deg, #111527 0%, #111527 49%, #414F80 100%);
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);

        img {
            position: absolute;
        }

        .img1 {
            width: 47px;
            height: 47px;
            top: 55px;
            left: 81px;
        }

        .img2 {
            width: 56px;
            height: 45px;
            top: 55px;
            left: 607px;
        }

        .middle-music {
            width: 427px;
            height: 427px;
            background: #59607D;
            border-radius: 50%;
            position: absolute;
            top: 136px;
            left: 50%;
            transform: translateX(-50%);

            .outline {
                width: 399px;
                height: 399px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .inline {
                width: 279px;
                height: 279px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;

            }

        }

        .inner-text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 606px;
            text-align: center;

            .inner-text-first {
                font-family: HarmonyOS Sans SC;
                font-size: 52px;
                font-weight: 500;
                line-height: 76px;
                letter-spacing: -0.06em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;

            }

            .inner-text-second {
                font-family: HarmonyOS Sans SC;
                font-size: 42px;
                font-weight: normal;
                line-height: 62px;
                letter-spacing: -0.06em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;
                margin-top: 7px;
                position: relative;

                img {
                    position: absolute;
                    left: 245px;
                    top: 20px;
                    width: 12px;
                    height: 24px;
                }
            }

            .inner-text-third {
                font-family: HarmonyOS Sans SC;
                font-size: 42px;
                font-weight: normal;
                line-height: 62px;
                letter-spacing: 0.01em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;
                margin-top: 6px;
            }

            img {
                width: 13px;
                height: 24px;

            }

        }

        .progress-bar {
            font-family: HarmonyOS Sans SC;
            font-size: 36px;
            font-weight: normal;
            line-height: 62px;
            letter-spacing: -0.01em;
            font-feature-settings: "kern" on;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 851px;
            width: 100%;


            .span-left {
                position: absolute;
                left: 104px;
            }

            .span-right {
                position: absolute;
                right: 104px;
            }

            .bar {
                width: 569px;
                height: 12px;
                border-radius: 6px;
                opacity: 0.4;
                background: #D8D8D8;
                position: absolute;
                margin-top: 71px;
                left: 50%;
                transform: translateX(-50%);

                img {
                    width: 12px;
                    height: 12px;
                    position: absolute;
                    left: 0px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        .music-view-bottom {
            position: absolute;
            top: 991px;
            height: 120px;
            width: 100%;

            img {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }

            .img1 {
                width: 53px;
                height: 44px;
                left: 77px;

            }

            .img2 {
                width: 43px;
                height: 46px;
                left: 202px;
            }

            .img3 {
                width: 117px;
                height: 117px;
                left: 311px;
            }

            .img4 {
                width: 43px;
                height: 46px;
                left: 494px;
            }

            .img5 {
                width: 60px;
                height: 37px;
                left: 607px;
            }

            .img12 {
                width: 53px;
                height: 44px;
            }

            .img13 {
                width: 53px;
                height: 35px;
            }
        }
    }

    .music-view-right {
        width: 1450px;
        height: 1239px;
        display: inline-block;
        margin-left: 146px;
        overflow: hidden;
        position: relative;



        .music-view-right-nav {
            display: flex;
            height: 54px;
            margin-top: 14px;

            .search {
                width: 32px;
                height: 32px;
                margin-left: 954px;
                margin-top: 24px;
            }

            .nav-item-first {
                width: 216px;
                font-family: HarmonyOS Sans SC;
                font-size: 46px;
                font-weight: 500;
                line-height: 54px;
                letter-spacing: -0.08em;
                font-feature-settings: "kern" on;
                color: #FFFFFF;
                position: relative;

                img {
                    width: 29px;
                    height: 29px;
                    vertical-align: middle;
                    margin-left: 16px;
                    margin-top: 28px;
                    position: absolute;
                    left: 232px;
                    top: -14px;
                }

                .select {
                    width: 372px;
                    height: 506px;
                    position: absolute;
                    border-radius: 34px;
                    opacity: 1;
                    background: #5E84C0;
                    z-index: 2;
                    top: 137px;
                    display: flex;
                    flex-direction: column;

                    .select-item {
                        width: 372px;
                        flex: 1;
                        font-family: HarmonyOS Sans SC;
                        font-size: 36px;
                        font-weight: 500;
                        line-height: 54px;
                        letter-spacing: 0em;
                        font-feature-settings: "kern" on;
                        color: #FDFEFF;
                        padding: 38px 0 0 33px;
                        border-radius: 34px;
                        box-sizing: border-box;
                    }

                    .select-item-active {
                        background: #009DFF;
                    }
                }
            }

            .nav-item {
                font-family: HarmonyOS Sans SC;
                font-size: 42px;
                font-weight: 500;
                line-height: 54px;
                letter-spacing: 0em;
                font-feature-settings: "kern" on;
                color: #DFE1E8;

            }

            .nav-item-left {
                margin: 0 150px 0 137px;
            }

            .nav-item-active {
                color: #FFFFFF;
            }
        }

        .music-view-right-music {
            width: 1450px;
            height: 1104px;
            background-color: #FFFFFF;
            margin-top: 67px;
            position: relative;

            img {
                width: 1450px;
                height: 1104px;
                position: absolute;
                top: 0;
            }
        }
    }
}
</style>
