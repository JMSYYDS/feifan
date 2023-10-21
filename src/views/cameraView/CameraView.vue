<template>
  <div class="camera-view">

    <div class="camera-lux" v-show="isRecording">
      <svg-icon iconClass="ic_lux" class="ic_lux"></svg-icon>
      <svg-icon iconClass="ic_lux_text" class="ic_lux_text"></svg-icon>
    </div>

    <div class="camera-icons">
      <svg-icon v-for="item in cameraIconsList"
                :key="item.iconName"
                :iconClass="item.iconName"
                :class="item.iconName"
                @click="item.method"
      ></svg-icon>
    </div>

    <div class="camera-shez">
      <svg-icon iconClass="ic_shez"
                class="ic_shez"
                @click="()=>{this.$refs.set.show()}"
      ></svg-icon>
    </div>


    <img src="../../assets/images/camera/urgent.png" class="urgent" v-show="urgentVisible">
    <img src="../../assets/images/camera/store.png" class="store" v-show="storeVisible">
    <img src="../../assets/images/camera/urgent2.png" class="warning" v-show="warningVisible">

    <u-page ref="set"
            class="setPage"
            title="行车影像设置"
    >
      <div class="set-content">
        <u-property-group>
          <u-property-item>
            <template #leftContent>
              分辨率
            </template>
            <template #rightContent>
              <div class="list1">
                <u-select :select-list="list1"></u-select>
              </div>
            </template>
          </u-property-item>
        </u-property-group>
        <u-property-group>
          <u-property-item>
            <template #leftContent>
              一般录制时长
            </template>
            <template #body>
              <div class="list2">
                <u-select :select-list="list2"></u-select>
              </div>
            </template>
          </u-property-item>
        </u-property-group>
        <u-property-group>
          <u-property-item model="select">
            <template #leftContent>
              一般录制时长
            </template>
            <template #leftContentDetail>
              启动此功能，系统可对紧急录你区域文件进行循环覆盖
            </template>
          </u-property-item>
        </u-property-group>
        <u-property-group>
          <u-property-item>
            <template #leftContent>
              全部
            </template>
            <template #rightContent>
              <u-button class="button">格式化</u-button>
            </template>
          </u-property-item>
          <div class="line"></div>
          <u-property-item>
            <template #leftContent>
              紧急录像
            </template>
            <template #rightContent>
              <u-button class="button">格式化</u-button>
            </template>
          </u-property-item>
          <div class="line"></div>
          <u-property-item>
            <template #leftContent>
              图片
            </template>
            <template #rightContent>
              <u-button class="button">格式化</u-button>
            </template>
          </u-property-item>
        </u-property-group>

      </div>

    </u-page>
    <u-page ref="store"
            class="storePage"
    >
      <div class="store-page-content">
        <div class="header">
          <u-nav :items=navList
                 :active-index="activeNavIndex"
                 is-large
                 @item-selected="handleSelected"
          ></u-nav>

          <div class="button-list">
            <u-button class="button1">上传至手机</u-button>
            <u-button class="button2">编辑</u-button>
          </div>
        </div>

        <div class="body">
          <img src="../../assets/images/camera/bg1.png" v-show="activeNavIndex === 0" class="bg large">
          <img src="../../assets/images/camera/bg2.png" v-show="activeNavIndex === 1" class="bg large">
          <img src="../../assets/images/camera/bg3.png" v-show="activeNavIndex === 2" class="bg small">
        </div>
      </div>
    </u-page>
  </div>
</template>

<script>
import UPage from "@/components/basic/UPage.vue";
import UPropertyGroup from "@/components/basic/UPropertyGroup.vue";
import UPropertyItem from "@/components/basic/UPropertyItem.vue";
import USelect from "@/components/basic/USelect.vue";
import UButton from "@/components/basic/UButton.vue";
import UNav from "@/components/basic/UNav.vue";

export default {
  name: 'QicheCliCameraView',
  components: {UNav, UButton, USelect, UPropertyItem, UPropertyGroup, UPage},

  data() {
    return {
      navList: [
        {text: '全部'},
        {text: '紧急录像'},
        {text: '图片'},
      ],
      activeNavIndex: 0,
      list1: [
        {itemContent: "1080P", isIcon: false},
        {itemContent: "720P", isIcon: false},
      ],
      list2: [
        {itemContent: "1分钟", isIcon: false},
        {itemContent: "3分钟", isIcon: false},
        {itemContent: "5分钟", isIcon: false},
        {itemContent: "10分钟", isIcon: false},

      ],
      isRecording: false,
      isUrgent: false,
      urgentVisible: false,
      warningVisible : false,
      storeVisible: false,
      cameraIconsList: [
        {
          iconName: "ic_xji",
          method: () => {
            this.storeVisible = true
            setTimeout(() => {
              this.storeVisible = false
            }, 1000)
          }
        },
        {
          iconName: "ic_gant",
          method: () => {
            if (this.urgentVisible) {
              this.urgentVisible = false
              this.warningVisible = true
              setTimeout(() => {
                this.warningVisible = false
              }, 2000)
              return
            }
            this.isUrgent = !this.isUrgent
            this.cameraIconsList[1].iconName = this.isUrgent ? 'ic_gant_light' : 'ic_gant'
            if (this.isUrgent) {
              this.urgentVisible = true
              setTimeout(() => {
                this.urgentVisible = false
              }, 2000)
            }
          }
        },
        {
          iconName: "ic_on",
          method: () => {
            this.isRecording = !this.isRecording
            this.cameraIconsList[2].iconName = this.isRecording ? 'ic_recording' : 'ic_on'
          }
        },
        {
          iconName: "ic_luyin",
          method: () => {
            this.isUrgent = !this.isUrgent
            this.cameraIconsList[3].iconName = this.isUrgent ? 'ic_luyin_light' : 'ic_luyin'
            if (this.isUrgent) {
              setTimeout(() => {
              }, 2000)
            }
          }
        },
        {
          iconName: "ic_wenj",
          method: () => {
            this.$refs.store.show()
          }
        },
      ]
    };
  },

  mounted() {
  },

  methods: {
    handleSelected(index) {
      this.activeNavIndex = index
    },
  },
};
</script>

<style lang="scss" scoped>
.camera-view {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/view/camera_bg.png") center no-repeat;
  background-size: cover;


  .camera-lux {
    position: absolute;
    top: 117px;
    left: 105px;
    display: flex;
    align-items: center;

    .ic_lux {
      width: 49.16px;
      height: 33.29px;
    }

    .ic_lux_text {
      width: 157px;
      height: 57px;
      margin-left: 44px;
    }
  }

  .camera-icons {
    position: absolute;
    left: 79px;
    top: 244px;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;

    .ic_xji {
      width: 130px;
      height: 130.03px;
    }

    .ic_gant, .ic_gant_light {
      width: 130px;
      height: 130px;
      margin-top: 48px;
      padding: 33px 25px 30px 38px;
    }

    .ic_on {
      width: 130px;
      height: 130px;
      margin-top: 146px;
    }

    .ic_recording {
      width: 130px;
      height: 130px;
      margin-top: 146px;
    }

    .ic_luyin, .ic_luyin_light {
      width: 130px;
      height: 130.03px;
      margin-top: 145px;
    }

    .ic_wenj {
      width: 130px;
      height: 130px;
      margin-top: 55px;
    }
  }

  .camera-shez {
    position: absolute;
    top: 245px;
    right: 79px;

    .ic_shez {
      width: 130px;
      height: 130px;
    }
  }

  .camera-shadow {
    position: absolute;
    left: 0;
    width: 225px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .camera-icon-bg {
    position: absolute;
    top: 422px;
    left: 100px;

    .ic_icon_bg {
      width: 130px;
      height: 130px;
    }
  }
}

.storePage {
  background: url("../../assets/images/common_bg.png") center no-repeat;
  background-size: cover;

  .header {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 0 274px;;
    top: 124px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .button-list {
      display: flex;
      .button2 {
        width: 166.55px;
        height: 76.89px;
      }

      .button1 {
        width: 290.11px;
        height: 76.89px;
        border-radius: 24px;
        margin-right: 44px;
      }
    }
  }

  .body {
    .bg {
      margin-top: 104px;
      margin-left: 64px;
    }

    .large {
      width: 2300px;
    }

    .small {
      width: 1109.1px;
    }
  }
}

.setPage {
  background: url("../../assets/images/common_bg.png") center no-repeat;
  background-size: cover;

  .set-content{
    width: 1472px;
    margin-top: 74px;
    margin-left: 80px;

    .list1 {
      width: 683px;
    }

    .list2 {
      margin-top: 39px;
    }

    .button {
      width: 263px;
      height: 70px;
      border-radius: 24px;
      background: #51658E;
    }
    .line{
      height: 0px;
      opacity: 1;

      border: 0.5px solid #D8D8D8;
    }
  }
}

.store {
  position: absolute;
  left: 1069.97px;
  top: 656.53px;
  width: 437.02px;
  height: 133.77px;
}

.urgent {
  position: absolute;
  width: 483.59px;
  height: 133.74px;
  border-radius: 34px;
  left: 1069.97px;
  top: 656.53px;
}

.warning {
  position: absolute;
  left: 927px;
  top: 753px;
  width: 719.42px;
  height: 133.74px;
}
</style>