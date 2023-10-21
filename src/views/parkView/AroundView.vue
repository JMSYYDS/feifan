<template>
  <div class="around-view">
    <div class="park-container" :style="{
      backgroundImage : isAround ? '' : `url(${require('../../assets/images/park/around_bg2.png')})`
    }">
      <div class="header">
        <div class="left">
          <svg-icon icon-class="dialog_close"
                    class="close"
                    @click="backHome"
          ></svg-icon>
          <svg-icon icon-class="ic_pdown"
                    class="ic_pdown"
                    @click="()=>{this.$router.push('/home/park')}"
          ></svg-icon>
          <svg-icon icon-class="ic_pup"
                    class="ic_pdown"
                    @click="()=>{this.$router.push('/home/park')}"
          ></svg-icon>

        </div>

        <div class="right">
          <svg-icon icon-class="ic_fangxiang"
                    class="ic_fangxiang"
                    @click="()=>{ this.adjustVisible = true }"
          ></svg-icon>

          <svg-icon icon-class="ic_car_sound"
                    class="ic_car_sound"
                    @click="isClickCar = !isClickCar"
                    :style="{
                      color: isClickCar ? '#009DFF' : '',
                    }"
          ></svg-icon>
          <svg-icon icon-class="ic_xitongshezhi"
                    class="ic_xitongshezhi"
                    @click="setVisible = true"
          ></svg-icon>
        </div>
      </div>
    </div>
    <div class="box" @click="()=>{isAround =!isAround}">

    </div>

    <s-dialog :visible="adjustVisible"
              title="后视镜位置调整"
              show-close
              @closeHandler="()=>{ this.adjustVisible = false }"
              hidde-bottom
              is-light
    >
      <div class="adjust-container">
        <div class="top">
          <div class="button-list">
            <u-button class="button1">
              <div class="icon">
                <svg-icon icon-class="ic_expand_back" class="ic_expand_back"></svg-icon>
              </div>
              <div class="text">
                展开后视镜
              </div>
            </u-button>
            <u-button class="button1">
              <div class="icon">
                <svg-icon icon-class="ic_hide_back" class="ic_expand_back"></svg-icon>
              </div>
              <div class="text">
                折叠后视镜
              </div>
            </u-button>
          </div>
        </div>

        <div class="bottom">
          <div class="header">
            <div class="title">
              倒车后视镜自动下倾
            </div>
            <div class="desc">
              功能开启后，R挡下可调节后视镜下倾的位置
            </div>
          </div>
          <div class="button-list">
            <u-button class="large">
              <u-property-item model="select">
                <template #leftContent>
                  左侧后视镜
                </template>
              </u-property-item>
              <u-button type="primary" disabled class="button">位置调整</u-button>
            </u-button>
            <u-button class="large">
              <u-property-item model="select">
                <template #leftContent>
                  右侧后视镜
                </template>
              </u-property-item>
              <u-button type="primary" disabled class="button">位置调整</u-button>
            </u-button>
          </div>

        </div>
      </div>
    </s-dialog>
    <s-dialog :visible="setVisible"
              title="设置"
              show-close
              hidde-bottom
              @closeHandler="()=>{ this.setVisible = false }"
              is-light
    >
      <u-property-group>
        <u-property-item model="select">
          <template #leftContent>
            低速打转向灯启动全景影像
          </template>
        </u-property-item>
        <u-property-item>
          <template #leftContent>
            自动泊车播报模式
          </template>
          <template #body>
            <u-select :select-list="selectList" class="list">

            </u-select>
          </template>
        </u-property-item>
      </u-property-group>
    </s-dialog>
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";
import SDialog from "@/components/basic/SDialog.vue";


export default {
  name: 'AroundView',
  components: {SDialog, UButton, USelect, UPropertyGroup, UPropertyItem, UNav},

  data() {
    return {
      isClickCar: false,
      setVisible: false,
      adjustVisible: false,
      isAround: true,
      selectList: [
        {itemContent: "简洁", isIcon: false},
        {itemContent: "标准", isIcon: false},
      ],
    };
  },

  mounted() {

  },

  methods: {
    backHome () {
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss" scoped>
.around-view {
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  box-sizing: border-box;
  padding-top: 80px;

  .box {
    position: absolute;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    top: 712px;
    left: 540px;
  }

  .park-container {
    background-image: url("../../assets/images/park/around_bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
    width: 100%;
    height: 100%;
    padding: 0 196px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,.right{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close {
      width: 34.9px;
      height: 34.9px;
      margin-right: 180px;
    }

    .ic_pdown {
      width: 70px;
      height: 70px;
      margin-right: 180px;

    }

    .ic_car_sound {
      width: 52px;
      height: 72px;
      color: #FFFFFF;
    }

    .ic_xitongshezhi {
      width: 47px;
      height: 50px;
      margin-left: 120px;
    }

    .ic_fangxiang {
      width: 82.12px;
      height: 44.57px;
      margin-right: 140px;
    }
  }

  .list {
    margin-top: 12px;
  }
}

.adjust-container {
  width: 1382px;
  .button-list {
    display: flex;

    .button1 {
      width: 306.42px;
      height: 220.37px;
      border-radius: 34px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      margin-right: 50px;

      .ic_expand_back {
        width: 85.94px;
        height: 36.03px;
        margin: 63px 0 18px;
      }
    }
  }

  .top {
    margin-bottom: 64px;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    .header{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      color: #E6E6E6;
      margin-bottom: 32px;

      .title {
        font-size: 40px;
        font-weight: 500;
        letter-spacing: -0.02em;
      }

      .desc {
        font-size: 30px;
        font-weight: 500;
        letter-spacing: -0.02em;
      }
    }

    .button-list {
      width: 100%;
      justify-content: start;
      .large {
        width: 619.78px;
        height: 246.79px;
        padding: 0 40px;
        margin-right: 51px;
        border-radius: 32px;
        display: flex;
        flex-direction: column;
        align-items: start;

        .button {
          width: 243.29px;
          height: 80.24px;
          border-radius: 26px;
        }
      }
    }
  }
}
</style>
