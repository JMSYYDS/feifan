<template>
  <div class="dropdown">
    <div class="dropdown-content" v-if="pageNum == 1">
        <p class="content-p">系统</p>
        <div class="content-xitong">
            <div class="content-xitong-left">
                <UDropDownSlider iconName="ic_sun"></UDropDownSlider>
                <UDropDownSlider iconName="ic_yinyue"></UDropDownSlider>
                <UDropDownSlider iconName="ic_daoh"></UDropDownSlider>
            </div>
            <div class="content-xitong-center">
                <UButton isClickable>
                    <div class="center-btn1">
                        <svg-icon iconClass="ic_wifi" class="ic_wifi"></svg-icon>
                        <p>Wi-Fi</p>
                    </div>
                </UButton>
                <UButton>
                    <div class="center-btn2" @click="$router.push('/xiping')">
                        <svg-icon iconClass="ic_xip" class="ic_xip"></svg-icon>
                        <p>息屏</p>
                    </div>
                </UButton>
            </div>
            <div class="content-xitong-right">
                <div style="width: 100%;display: flex;justify-content: space-between;">
                    <UButton isClickable>
                        <div class="right-btn1">
                            <svg-icon iconClass="ic_lanya" class="ic_lanya"></svg-icon>
                            <p>蓝牙</p>
                        </div>
                    </UButton>
                    <div class="right-btns">
                        <UButton isClickable>
                            <div class="right-btn">
                                <svg-icon iconClass="ic_5G" class="ic_5G"></svg-icon>
                                <p>启用5G</p>
                            </div>
                        </UButton>
                        <UButton>
                            <div class="right-btn">
                                <svg-icon iconClass="ic_shuaxin" class="ic_shuaxin"></svg-icon>
                                <p>网络刷新</p>
                            </div>
                        </UButton>
                    </div>
                </div>
                <UButton>
                    <div class="right-btn2" @click="pageNum = 2">
                        <svg-icon iconClass="ic_xinxi" class="ic_xinxi"></svg-icon>
                        <p>没有最新消息</p>
                    </div>
                </UButton>
            </div>
        </div>
        <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
            <p class="content-p">车辆</p>
            <svg-icon iconClass="ic_jilu" class="ic_jilu" @click="pageNum = 3"></svg-icon>
        </div>
        <div class="content-cheliang">
            <UButton isClickable>
                <div class="cheliang-btn">
                    <svg-icon iconClass="ic_hellorising" class="ic_hellorising"></svg-icon>
                    <p>Hello RISING</p>
                </div>
            </UButton>
            <UButton>
                <div class="cheliang-btn">
                    <svg-icon iconClass="ic_car2" class="ic_car2"></svg-icon>
                    <p>电动尾门</p>
                </div>
            </UButton>
            <div class="cheliang-btn" :class="jiarIconIndex==0?'cheliang-btn-default':'cheliang-btn-active'" @click="handleJiaR">
                <svg-icon :iconClass="jiarIcons[jiarIconIndex]" class="ic_jiar"></svg-icon>
                <p>主驾座椅加热</p>
            </div>
            <div class="cheliang-btn cheliang-btn-default" :class="tongfIconIndex==0?'cheliang-btn-default':'cheliang-btn-active'" @click="handleTongF">
                <svg-icon :iconClass="tongfIcons[tongfIconIndex]" class="ic_jiar"></svg-icon>
                <p>主驾座椅通风</p>
            </div>
            <UButton>
                <div class="cheliang-btn">
                    <svg-icon iconClass="ic_zhuzuoyi" class="ic_zhuzuoyi"></svg-icon>
                    <p>主驾座椅通风</p>
                </div>
            </UButton>
        </div>
    </div>
    <div class="dropdown-content2" v-if="pageNum == 2">
        <div class="content2-img1">
            <img v-if="page2Img == 1" src="../../assets/images/dropdown/page2_bg1.png" alt="">
            <img v-if="page2Img == 2" src="../../assets/images/dropdown/page2_bg2.png" alt="">
            <div class="back-click" @click="pageNum = 1"></div>
            <div class="click1" @click="page2Img = 1"></div>
            <div class="click2" @click="page2Img = 2"></div>
        </div>
        <p style="color: white">暂无行车消息</p>
    </div>
    <div class="dropdown-content3" v-if="pageNum == 3">
        <div class="back-click" @click="pageNum = 1"></div>
    </div>
    <div class="slider-up" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
    </div>
  </div>
</template>

<script>
import UButton from '@/components/basic/UButton.vue'
import UDropDownSlider from '@/components/basic/UDropDownSlider.vue'
export default {
    name: "dropdown",
    components: {
        UButton,
        UDropDownSlider
    },
    data() {
        return {
            pageNum: 1,
            startPageY: 0,
            jiarIcons: ["ic_jiar1", "ic_jiar2", "ic_jiar3", "ic_jiar4"],
            jiarIconIndex: 0,
            tongfIcons: ["ic_tongf1", "ic_tongf2", "ic_tongf3", "ic_tongf4"],
            tongfIconIndex: 0,
            page2Img: 1
        }
    },
    methods: {
        handleJiaR() {
            if(this.jiarIconIndex == 3) {
                this.jiarIconIndex = 0
            }else{
                this.jiarIconIndex++
            }
        },
        handleTongF() {
            if(this.tongfIconIndex == 3) {
                this.tongfIconIndex = 0
            }else{
                this.tongfIconIndex++
            }
        },
        handleTouchStart(e) {
            // console.log("aaaa");
            this.startPageY = e.touches[0].pageY
        },
        handleTouchMove(e) {
            if (this.startPageY - e.changedTouches[0].pageY != 0) {
                this.$router.push("/home")
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(60px);
  font-size: 32px;
    .dropdown-content{
        padding: 240px 400px;
        box-sizing: border-box;
        width: 100%;
        .content-p{
            font-size: 50px;
            color: white;
            margin-bottom: 40px;
        }
        .ic_jilu{
            width: 44.2px;
            height: 43.3px;
        }
        .content-xitong{
            width: 100%;
            margin-bottom: 92px;
            display: flex;
            justify-content: space-between;
            &-left{
                width: 681.92px;
                height: 466px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }
            &-center{
                width: 316.03px;
                height: 466px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .center-btn1{
                    width: 316.03px;
                    height: 299.37px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .ic_wifi{
                        width: 64.5px;
                        height: 44.88px;
                    }
                }
                .center-btn2{
                    width: 316.03px;
                    height: 133.83px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .ic_xip{
                        width: 46.47px;
                        height: 36.24px;
                    }
                }
            }
            &-right{
                width: 681.92px;
                height: 466px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .right-btn1{
                    width: 316.03px;
                    height: 299.37px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .ic_lanya{
                        width: 64.5px;
                        height: 44.88px;
                    }
                }
                .right-btns{
                    height: 299.37px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    .right-btn{
                        width: 316.03px;
                        height: 132.67px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        .ic_5G{
                            width: 35.14px;
                            height: 27.21px;
                        }
                        .ic_shuaxin{
                            width: 34px;
                            height: 36.31px;
                        }
                    }
                }
                .right-btn2{
                    width: 671.88px;
                    height: 133.83px;
                    padding-left: 56px;
                    padding-right: 33px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .ic_xinxi{
                        width: 44.14px;
                        height: 29.46px;
                    }
                }
            }
        }
        .content-cheliang{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cheliang-btn {
              width: 316.03px;
              height: 299.36px;
              font-size: 32px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;

              .ic_hellorising {
                width: 88.63px;
                height: 42.69px;
              }

              .ic_car2 {
                width: 92.78px;
                    height: 45.65px;
                }
                .ic_zhuzuoyi{
                    width: 62px;
                    height: 58px;
                }
                .ic_jiar{
                    width: 61.48px;
                    height: 57.2px;
                }
                p{
                    color: white;
                }
            }
            .cheliang-btn-default{
                border-radius: 16px;
                background-color: rgba($color:#7A89A5,$alpha:0.5);
            }
            .cheliang-btn-active{
                border-radius: 16px;
                background-color: #4499F5;
            }
        }
    }
    .dropdown-content2{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .content2-img1{
            position: absolute;
            top: 150px;
            left: 150px;
            width: 559.23px;
            height: 73.92px;
            img{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                object-fit: contain;
            }
            .back-click{
                position: absolute;
                left: 0;
                top: 8px;
                width: 30px;
                height: 50px;
            }
            .click1{
                position: absolute;
                left: 79px;
                top: 5px;
                width: 184px;
                height: 54px;
            }
            .click2{
                position: absolute;
                right: 0;
                top: 5px;
                width: 184px;
                height: 54px;
            }
        }
    }
    .dropdown-content3{
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/images/dropdown/page3.png");
        background-size: 100% 100%;
        .back-click{
            position: absolute;
            top: 150px;
            left: 150px;
            width: 30px;
            height: 50px;
        }
    }
    .slider-up{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
    }
}
</style>
<style scoped>
::v-deep(.button) {
    padding: 0;
}
</style>
