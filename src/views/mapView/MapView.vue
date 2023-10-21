<template>
  <div class="map-view" :style="{
    backgroundImage :currentVisible ? `url(${require('../../assets/images/map/bg2.png')})` : ''
  }">
    <div class="map-seek">
      <svg-icon iconClass="ic_seek" class="ic_seek"
                @click="searchDialogVisible = true"
      ></svg-icon>
    </div>

    <div class="map-icons">
      <svg-icon :iconClass="currentVisible ? 'ic_N' : 'ic_daoh'" class="daoh-icon"
      ></svg-icon>
      <svg-icon :iconClass="isSoundOff ? 'ic_sound_off' : 'ic_voice'" class="voice-icon"
                @click="()=>{isSoundOff = !isSoundOff}"
      ></svg-icon>
      <svg-icon iconClass="ic_shezhi" class="shezhi-icon"
                @click="()=>{setDialogVisible = !setDialogVisible}"
      ></svg-icon>
      <div class="line"></div>
      <svg-icon iconClass="ic_off-on" class="off-icon" @click="()=>{positionVisible = true}"></svg-icon>
    </div>

    <div class="map-right-bottom">
      <svg-icon iconClass="ic_dingwei" class="ic_dingwei" @click="()=>{chargingVisible = true}"></svg-icon>
      <svg-icon :iconClass="currentVisible ? 'ic_ding3' : 'ic_ding2'" class="ic_ding2"
                @click="currentVisible= ! currentVisible"
      ></svg-icon>
    </div>

    <div class="map-current">
      <svg-icon iconClass="ic_map_current" class="ic_map_current"></svg-icon>
    </div>

    <!--设置弹框-->
    <div class="setDialog" v-show="setDialogVisible">
      <div class="header">
        <svg-icon iconClass="dialog_close" class="close-icon"
                  @click="()=>{setDialogVisible = false}"
        ></svg-icon>
        <u-nav :items="[
            {
              text:'地图',
            },
            {
              text:'导航',
            },
            {
              text:'播报',
            },
        ]" :active-index=0></u-nav>
        <svg-icon iconClass="ic_people" class="people-icon"></svg-icon>
      </div>

      <div class="body">
        <u-property-group class="group" type="map">
          <u-property-item model="select" class="item">
            <template #leftContent>
              实时路况
            </template>
          </u-property-item>
        </u-property-group>

        <u-property-group class="group" type="map">
          <u-property-item>
            <template #leftContent>
              显示模式
            </template>
            <template #rightContent>
              <div class="selectList">
                <u-select :select-list="[
                  {itemContent: '白天', isIcon: false},
                  {itemContent: '黑夜', isIcon: false},
                  {itemContent: '自动', isIcon: false},
              ]"
                >
                </u-select>
              </div>

            </template>
          </u-property-item>
        </u-property-group>

        <div class="group-title">
          常用地址
        </div>
        <u-property-group class="group" type="map">
          <u-property-item right-icon-name="ic_next" left-icon-name="ic_home">
            <template #leftContent>
              <div class="item-name">
                家
              </div>
            </template>
            <template #rightContent>
              点击设置家庭地址
            </template>
          </u-property-item>

          <div class="line">

          </div>

          <u-property-item right-icon-name="ic_next" left-icon-name="ic_gsi">
            <template #leftContent>
              <div class="item-name">
                公司
              </div>
            </template>
            <template #rightContent>
              点击设置公司地址
            </template>
          </u-property-item>

        </u-property-group>

        <u-property-group class="group" type="map">
          <u-property-item :is-info="true" right-icon-name="ic_next">
            <template #leftContent>
              离线地图包
            </template>
            <template #rightContent>
              <div class="map-content">
                <div>
                  地图专用剩余容量15.0G
                </div>
                <img src="../../assets/images/map/process.png" alt="" class="process">
              </div>
            </template>
          </u-property-item>
          <div class="line">

          </div>

          <u-property-item>
            <template #leftContent>
              南京市
            </template>
            <template #rightContent>
              <div class="map-content">
                <div>
                  119.1M
                </div>
                <button class="button">
                  已最新
                </button>
              </div>
            </template>
          </u-property-item>
        </u-property-group>
        <div class="group-title">
          C-V2X 信息提示
          <svg-icon iconClass="user_info" class="user_info"></svg-icon>
        </div>

      </div>
    </div>

    <!--搜索弹框-->
    <div class="searchDialog" v-show="searchDialogVisible">
      <div class="container">
        <div class="close-box" @click="()=>{searchDialogVisible = false}">

        </div>

        <div class="route-box" @click="()=>{
          searchDialogVisible = false;
          routeDialogVisible = true
        }">

        </div>
      </div>
    </div>

    <!--途经点弹框-->
    <div class="routeDialog" v-show="routeDialogVisible">
      <div class="container">
        <div class="close-box" @click="()=>{routeDialogVisible = false}">

        </div>

        <div class="route-box" @click="()=>{
          routeDialogVisible = false;
          navigationVisible = true
        }">

        </div>
      </div>
    </div>

    <!--导航弹框-->
    <div class="navigationDialog" v-show="navigationVisible">
      <div class="container">
        <div class="close-box" @click="over">

        </div>
      </div>
    </div>

    <!--结束导航弹框-->
    <div class="over" v-show="overVisible">
      导航结束
    </div>

    <!--途经点弹框-->
    <div class="chargingDialog" v-show="chargingVisible">
      <div class="container">
        <div class="close-box" @click="()=>{chargingVisible = false}">

        </div>
      </div>
    </div>

    <img src="../../assets/images/map/bg.png"
         alt=""
         class="position"
         v-show="positionVisible"
         @click="()=>{positionVisible = false}">
  </div>
</template>

<script>
import UNav from "@/components/basic/UNav.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";

export default {
  name: 'QicheCliMapView',
  components: {UButton, USelect, UPropertyGroup, UPropertyItem, UNav},

  data() {
    return {
      isSoundOff: false,
      setDialogVisible: false,
      searchDialogVisible: false,
      routeDialogVisible: false,
      navigationVisible: false,
      chargingVisible: false,
      overVisible: false,
      positionVisible: false,
      currentVisible: false
    };
  },

  mounted() {

  },

  methods: {
    over() {
      this.navigationVisible = false
      this.overVisible = true
      setTimeout(() => {
        this.overVisible = false
      }, 2000)
    }
  },
};
</script>

<style lang="scss" scoped>
.map-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/view/map_bg.png");
  background-size: 100% 100%;

  .position {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .map-seek {
    position: absolute;
    top: 100px;
    left: 80.83px;

    .ic_seek {
      width: 127px;
      height: 126px;
    }
  }

  .map-icons {
    position: absolute;
    top: 1233px;
    left: 78px;
    width: 614px;
    height: 127px;
    border-radius: 28px;
    opacity: 1;
    background: #4F6299;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .daoh-icon {
      width: 50px;
      height: 50px;
    }

    .shezhi-icon {
      width: 61.15px;
      height: 60px;
    }

    .off-icon {
      width: 53px;
      height: 31px;
    }

    .voice-icon {
      width: 50.64px;
      height: 41.7px;
    }

    .line {
      height: 46px;
      border: 3.4px solid #FFFFFF;
    }
  }

  .map-right-bottom {
    position: absolute;
    top: 1071px;
    right: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .ic_dingwei {
      width: 127px;
      height: 126px;
    }

    .ic_ding2 {
      width: 127px;
      height: 126px;
      margin-top: 37px;
    }
  }

  .map-current {
    position: absolute;
    top: 414px;
    left: 1340px;

    .ic_map_current {
      width: 277px;
      height: 281px;
    }
  }

  .setDialog {
    position: absolute;
    left: 80.83px;
    top: 100.2px;
    width: 1427.09px;
    height: 1095.35px;
    border-radius: 30px;
    opacity: 1;
    background: #4A639D;
    padding: 40px 48px;
    box-sizing: border-box;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close-icon {
        width: 27.46px;
        height: 27.39px;
      }

      .people-icon {
        width: 34.01px;
        height: 39.27px;
      }
    }

    .body {
      font-size: 34px;
      font-weight: 500;
      color: #FDFDFE;
      margin-top: 18px;

      .group {
        background: #728FCF;
        border-radius: 30px;

        .item {
          height: 111px;
          width: 100%;
        }

        .item-name {
          margin-left: 20px;
        }

        .line {
          width: 100%;
          height: 0px;
          opacity: 0.5;

          border: 3.4px solid #87A4E2;
        }

        .map-content {
          display: flex;
          align-items: center;
          justify-content: end;
        }

        .process {
          width: 108.78px;
          height: 13.63px;
          margin-left: 16px;
        }

        .button {
          width: 206.16px;
          height: 70.43px;
          border-radius: 22px;
          opacity: 1;
          border: none;
          color: #FDFDFE;
          font-size: 28px;
          background: #96B0EF;
          margin-left: 18px;
        }

        .user_info {
          width: 35.05px;
          height: 35.06px;
          margin-left: 16px;
        }
      }

      .group-title {
        width: 100%;
        text-align: left;
        padding-left: 16px;
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 32px;
        display: flex;
        align-items: center;
      }

      .selectList {
        width: 876.83px;
      }
    }

  }

  .searchDialog {
    position: absolute;
    width: 729.44px;
    height: 1052.37px;
    border-radius: 28px;
    opacity: 1;
    left: 80.66px;
    top: 99.16px;
    background: url("../../assets/images/map/search.png") center no-repeat;
    background-size: cover;

    .container {
      width: 100%;
      height: 100%;
      position: relative;

      .close-box {
        position: absolute;
        top: 66px;
        left: 48px;
        width: 30px;
        height: 30px;
      }

      .route-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 156px;
      }
    }
  }

  .routeDialog {
    position: absolute;
    width: 602.54px;
    height: 1052.29px;
    border-radius: 28px;
    opacity: 1;
    left: 80.66px;
    top: 99.16px;
    background: url("../../assets/images/map/route.png") center no-repeat;
    background-size: cover;

    .container {
      width: 100%;
      height: 100%;
      position: relative;

      .close-box {
        position: absolute;
        top: 66px;
        left: 48px;
        width: 30px;
        height: 30px;
      }

      .route-box {
        position: absolute;
        bottom: 40px;
        left: 28px;
        width: 534.47px;
        height: 73.64px;
      }
    }
  }

  .chargingDialog {
    position: absolute;
    width: 729.45px;
    height: 1012.4px;
    border-radius: 28px;
    opacity: 1;
    left: 80.66px;
    top: 99.16px;
    background: url("../../assets/images/map/charging.png") center no-repeat;
    background-size: cover;

    .container {
      width: 100%;
      height: 100%;
      position: relative;

      .close-box {
        position: absolute;
        top: 66px;
        left: 45px;
        width: 40px;
        height: 40px;
      }

    }
  }

  .navigationDialog {
    position: absolute;
    width: 589.19px;
    height: 428.09px;
    border-radius: 28px;
    opacity: 1;
    left: 80.66px;
    top: 99.16px;
    background: url("../../assets/images/map/navigation.png") center no-repeat;
    background-size: cover;

    .container {
      width: 100%;
      height: 100%;
      position: relative;

      .close-box {
        position: absolute;
        bottom: 15px;
        left: 35.12px;
        width: 141.56px;
        height: 72.5px;
        border-radius: 26px;
      }
    }
  }

  .over {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 466.75px;
    height: 128.3px;
    border-radius: 26px;
    opacity: 1;

    background: #040E1B;
    font-size: 32px;
    font-weight: normal;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
