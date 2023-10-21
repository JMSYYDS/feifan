<template>
  <div class="bottom_container" v-if="!isScreenClear">
    <div v-for="item in bottomIconList" :key="item.key" class="icon_box" @click="handleIcon(item.key)" :ref="item.key">
      <svg-icon v-if="item.type=='icon'" :iconClass="item.iconName" :class="item.iconName"></svg-icon>
      <div v-else-if="item.type=='text1'" class="icon_box_text">
        {{ iconNum1String }}
      </div>
      <div v-else class="icon_box_text">
        {{ iconNum2String }}
      </div>
    </div>

    <div class="bottom-ic-wind-bar">
      <svg-icon iconClass="ic_wind_bar" class="ic_wind_bar"></svg-icon>
    </div>

    <div class="temperature-model" v-if="isTemperature_img1||isTemperature_img2" @click="closeTemperature">
      <div :class="isTemperature_img1?'temperature-model-content1':'temperature-model-content2'">
        <div class="temperature-model-number">
          {{ isTemperature_img1 ? iconNum1String : iconNum2String }}
        </div>
        <div class="temperature-model-img">
          <div class="temperature-model-slider">
            <div class="temperature-model-iconBtn" ref="iconBtn">
              <svg-icon iconClass="ic_temBtn" class="ic_temBtn"></svg-icon>
            </div>
          </div>
          <div class="temperature-model-btn">
            <img src="../assets/images/bottom/temperature_btn.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QicheCliBottom',

  data() {
    return {
      bottomIconList: [
        {
          type: "icon",
          iconName: "ic_car",
          key: "ic_car"
        },
        {
          type: "icon",
          iconName: "ic_wind",
          key: "ic_wind"
        },
        {
          type: "icon",
          iconName: "ic_arrow",
          key: "reduceNum1"
        },
        {
          type: "text1",
          iconName: "26",
          key: "1"
        },
        {
          type: "icon",
          iconName: "ic_arrow1",
          key: "addNum1"
        },

        {
          type: "icon",
          iconName: "ic_guide",
          key: "ic_guide"
        },
        {
          type: "icon",
          iconName: "ic_function",
          key: "ic_function"
        },
        {
          type: "icon",
          iconName: "ic_music",
          key: "ic_music"
        },
        {
          type: "icon",
          iconName: "ic_arrow",
          key: "reduceNum2"
        },
        {
          type: "text2",
          iconName: "26",
          key: "2"
        },
        {
          type: "icon",
          iconName: "ic_arrow1",
          key: "addNum2"
        },
        {
          type: "icon",
          iconName: "ic_chair",
          key: "ic_chair"
        },
        {
          type: "icon",
          iconName: "ic_window",
          key: "ic_window"
        },
      ],
      iconNum1: 26,
      iconNum2: 26,
      isTemperature_img1: false,
      isTemperature_img2: false,
      isScreenClear: false
    };
  },

  mounted() {

  },

  methods: {
    handleIcon(key) {
      if (key == "reduceNum1") {
        this.isTemperature_img1 = true
        this.isTemperature_img2 = false
        if (this.iconNum1 >= 18) {
          this.iconNum1 -= 1
        }
        this.iconBtnMove(this.iconNum1, "reduce")
      }
      if (key == "addNum1") {
        this.isTemperature_img1 = true
        this.isTemperature_img2 = false
        if (this.iconNum1 <= 32) {
          this.iconNum1 += 1
        }
        this.iconBtnMove(this.iconNum1, "add")
      }
      if (key == "reduceNum2") {
        this.isTemperature_img1 = false
        this.isTemperature_img2 = true
        if (this.iconNum2 >= 18) {
          this.iconNum2 -= 1
        }
        this.iconBtnMove(this.iconNum2, "reduce")
      }
      if (key == "addNum2") {
        this.isTemperature_img1 = false
        this.isTemperature_img2 = true
        if (this.iconNum2 <= 32) {
          this.iconNum2 += 1
        }
        this.iconBtnMove(this.iconNum2, "add")
      }
      if (key == "1" || key == "2") {
        if (this.$route.name == "temperature") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/temperature")
        }
      }
      if (key == "ic_wind") {
        if (this.$route.name == "temperature") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/temperature")
        }
      }
      if (key == "ic_function") {
        this.$router.push("/home")
      }
      if (key == "ic_guide") {
        if (this.$route.name == "map") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/map")
        }
      }
      if (key == "ic_car") {
        if (this.$route.name == "car") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/car")
        }
      }
      if (key == "ic_chair") {
        if (this.$route.name == "seat") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/seat")
        }
      }
      if (key == "ic_music") {
        if (this.$route.name == "music") {
          this.$router.push("/home")
        } else {
          this.$router.push("/home/music")
        }
      }
      if (key == "ic_window") {
        if (this.bottomIconList[this.bottomIconList.length - 1].iconName == "ic_window") {
          this.bottomIconList[this.bottomIconList.length - 1].iconName = "ic_window_active"
        } else {
          this.bottomIconList[this.bottomIconList.length - 1].iconName = "ic_window"
        }
      }
      trackMdaEvent(
          "auto_common_event",
          {
            _post: true,
            biz: "auto",
            type: "click",
            action: "auto_media_detail_page_click",
            ctime: new Date().getTime(),
            element: "list",
            pmark: "分页",
            ekv: JSON.stringify({ seriesID: "6925" }),
          },
          { seriesID: "6925" }
      );
    },
    // 温度滑块移动函数
    iconBtnMove(num, type) {
      let unit = ""
      if (window.innerWidth < window.innerHeight) {
        unit = "vw"
      } else {
        unit = "vh"
      }
      setTimeout(() => {
        if (num >= 18 && num <= 32) {
          this.$refs.iconBtn.style.left = (1 / 17.84) * (num - 17) * (538 / 17) + unit
        } else {
          if (type == "add") {
            this.$refs.iconBtn.style.left = (1 / 17.84) * (538 - 27) + unit
          } else {
            this.$refs.iconBtn.style.left = 0
          }

        }
      }, 0);
    },
    closeTemperature() {
      this.isTemperature_img1 = false
      this.isTemperature_img2 = false
    }
  },
  computed: {
    iconNum1String() {
      if (this.iconNum1 < 18) {
        return "LO"
      }
      if (this.iconNum1 > 32) {
        return "HI"
      }
      return this.iconNum1 + "°"
    },
    iconNum2String() {
      // -17乘538/15
      if (this.iconNum2 < 18) {
        return "LO"
      }
      if (this.iconNum2 > 32) {
        return "HI"
      }
      return this.iconNum2 + "°"
    }
  },
  watch: {
    $route(to, from) {
      this.isScreenClear = false
      if (this.$route.name == "homePage") {
        this.bottomIconList[6].iconName = "ic_function"
      } else {
        this.bottomIconList[6].iconName = "ic_function_active"
      }
      if (this.$route.name == "temperature") {
        this.bottomIconList[1].iconName = "ic_wind_active"
      } else {
        this.bottomIconList[1].iconName = "ic_wind"
      }
      if(this.$route.name == "screenClear") {
        this.isScreenClear = true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom_container {
  width: 100%;
  height: 168px;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99999;
  position: absolute;


  .icon_box {
    display: flex;
    justify-content: center;
    align-items: center;

    .ic_car {
      width: 80px;
      height: 80px;
      margin-left: 200px;
    }

    .ic_wind {
      width: 80px;
      height: 80px;
    }

    .ic_wind_active {
      width: 57px;
      height: 57px;
      padding: 11.5px;
    }

    .ic_arrow {
      width: 24px;
      height: 24px;
      margin-right: -20px;
    }

    .icon_box_text {
      font-size: 56px;
      font-weight: 500;
      color: #FCFCFC;
      margin-left: -20px;
      margin-right: -20px;
    }

    .ic_arrow1 {
      width: 24px;
      height: 24px;
      margin-left: -20px;
    }

    .ic_guide {
      width: 80px;
      height: 80px;
    }

    .ic_function, .ic_function_active {
      width: 80px;
      height: 80px;
    }

    .ic_music {
      width: 80px;
      height: 80px;
    }

    .ic_chair {
      width: 80px;
      height: 80px;
    }

    .ic_window, .ic_window_active {
      width: 80px;
      height: 80px;
      margin-right: 200px;
    }
  }

  .bottom-ic-wind-bar {
    position: absolute;
    left: 452px;
    bottom: 30px;

    .ic_wind_bar {
      width: 82.56px;
      height: 5.17px;
    }
  }

  .temperature-model {
    background-image: url("../assets/images/bottom/temperature_model.png");
    background-size: 100% 100%;
    background: rgba(0, 0, 0, 0.59);
    width: 2558.28px;
    height: 399.16px;
    position: absolute;
    bottom: 137px;

    .temperature-model-content1 {
      width: 701.37px;
      height: 140px;
      position: absolute;
      left: 498px;
      bottom: 88px;

      .temperature-model-number {
        position: absolute;
        top: 0;
        left: 212px;
        font-size: 72px;
        font-weight: 500;
        line-height: 48px;
        letter-spacing: 0.03em;
        color: #FFFFFF;
      }

      .temperature-model-img {
        position: absolute;
        bottom: 0;
        width: 700px;
        height: 59px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .temperature-model-slider {
          position: relative;
          width: 538px;
          height: 29.29px;
          border-radius: 14.65px;
          background: linear-gradient(90deg, #49A1F8 0%, #EA365D 100%);

          .temperature-model-iconBtn {
            position: absolute;
            left: 284px;
            display: flex;
            align-items: center;

            .ic_temBtn {
              width: 27px;
              height: 27px;
            }
          }
        }

        .temperature-model-btn {
          img {
            width: 138px;
            height: 59px;
          }
        }
      }
    }

    .temperature-model-content2 {
      width: 701.37px;
      height: 140px;
      position: absolute;
      right: 360px;
      bottom: 88px;

      .temperature-model-number {
        position: absolute;
        top: 0;
        left: 212px;
        font-size: 72px;
        font-weight: 500;
        line-height: 48px;
        letter-spacing: 0.03em;
        color: #FFFFFF;
      }

      .temperature-model-img {
        position: absolute;
        bottom: 0;
        width: 700px;
        height: 59px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .temperature-model-slider {
          width: 538px;
          height: 29.29px;
          border-radius: 14.65px;
          background: linear-gradient(90deg, #49A1F8 0%, #EA365D 100%);

          .temperature-model-iconBtn {
            position: absolute;
            left: 284px;
            display: flex;
            align-items: center;

            .ic_temBtn {
              width: 27px;
              height: 27px;
            }
          }
        }

        .temperature-model-btn {
          img {
            width: 138px;
            height: 59px;
          }
        }
      }
    }
  }
}
</style>
