<template>
  <div class="car-view">
    <div class="car-setting"
         :class="navStyle"
         :style="isRadius?'border-top-right-radius: 0;border-bottom-right-radius: 0;':''"
    >
      <svg-icon icon-class="dialog_close" class="car-close" @click="handleClose"></svg-icon>
      <ul>
        <li v-for="(item,index) in setNavList" :key="index" @click="choose(index)"
            :class="{active : activeIndex === index}"

        >
          <svg-icon :icon-class=item.iconName :class="`class_${item.iconName}`"></svg-icon>
          <div class="title">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
    <div class="rightContainer">
      <car-outside-set v-if="activeIndex === 1"></car-outside-set>
      <car-inside-set v-if="activeIndex === 2"></car-inside-set>
      <car-assistant-set v-if="activeIndex === 3"></car-assistant-set>
      <car-experience-set v-if="activeIndex === 4"></car-experience-set>
      <car-safe-set v-if="activeIndex === 5"></car-safe-set>
      <car-system-set v-if="activeIndex === 6"></car-system-set>
      <car-about-set v-if="activeIndex === 7"></car-about-set>
      <quick-control v-if="activeIndex === 0" @sliderRadius="sliderRadius"></quick-control>
    </div>
  </div>
</template>

<script>
import CarOutsideSet from "@/components/car/CarOutsideSet.vue";
import CarInsideSet from "@/components/car/CarInsideSet.vue";
import CarAssistantSet from "@/components/car/CarAssistantSet.vue";
import CarExperienceSet from "@/components/car/CarExperienceSet.vue";
import CarSafeSet from "@/components/car/CarSafeSet.vue";
import CarSystemSet from "@/components/car/CarSystemSet.vue";
import CarAboutSet from "@/components/car/CarAboutSet.vue";
import QuickControl from "@/components/car/QuickControl.vue";

export default {
  name: 'QicheCliCarView',
  components: {CarAboutSet, CarSystemSet, CarSafeSet, CarExperienceSet, CarAssistantSet, CarInsideSet, CarOutsideSet, QuickControl},

  data() {
    return {
      setNavList: [
        {
          title: "快捷控制",
          iconName: "set_control"
        },
        {
          title: "车外设置",
          iconName: "set_outside"
        },
        {
          title: "车内设置",
          iconName: "set_inside"
        },
        {
          title: "辅助驾驶",
          iconName: "set_cop"
        },
        {
          title: "驾驶体验",
          iconName: "set_exper"
        },
        {
          title: "安全设置",
          iconName: "set_safe"
        },
        {
          title: "系统设置",
          iconName: "set_sys"
        },
        {
          title: "关于软件",
          iconName: "set_about"
        },
      ],
      activeIndex: 0,
      isRadius: false
    };

  },
  props: {},
  mounted() {
  },
  computed: {
    navStyle() {
      return this.activeIndex === 0 ? 'border-radius1' : 'border-radius2'
    }
  },
  methods: {
    handleClose() {
      this.$router.push("/home")
    },
    choose(index) {
      this.activeIndex = index
    },
    sliderRadius(val) {
      this.isRadius = val
    }
  },
};
</script>

<style lang="scss" scoped>
.car-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/common_bg.png");
  background-size: 100% 100%;
  // display: flex;

  .car-setting {
    position: absolute;
    top: 109px;
    left: 72px;
    width: 366.44px;
    height: 1288.58px;
    opacity: 1;
    background: linear-gradient(248deg, #303957 -7%, #0A0D18 87%);
    box-sizing: border-box;
    border: 4px solid #384054;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }

    ul {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 150px;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 343.33px;
        height: 103.48px;
        border-radius: 25px;
        opacity: 0.85;
        padding-right: 30px;
        padding-left: 30px;
        box-sizing: border-box;
        font-size: 36px;
        font-weight: normal;
        line-height: 54px;
        letter-spacing: -0.01em;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
        margin-bottom: 36px;

        .title {

        }

        .class_set_control {
          width: 52px;
          height: 62px;
          margin-right: 35px;
        }

        .class_set_outside {
          width: 56px;
          height: 56px;
          margin-right: 36px;

        }

        .class_set_inside {
          width: 64px;
          height: 33px;
          margin-right: 29px;
        }

        .class_set_cop {
          width: 44px;
          height: 44px;
          margin-right: 39px;
        }

        .class_set_exper {
          width: 48px;
          height: 44px;
          margin-right: 38px;
        }

        .class_set_safe {
          width: 36px;
          height: 44px;
          margin-right: 44px;
        }

        .class_set_sys {
          width: 66px;
          height: 66px;
          margin-right: 28px;
        }

        .class_set_about {
          width: 48px;
          height: 42px;
          margin-right: 38px;
        }

      }
    }
  }

  .car-close {
    position: absolute;
    top: 72px;
    left: 70px;
    width: 32px;
    height: 32.11px;
  }
}

.rightContainer {
  position: absolute;
  left: 436px;
  right: 72px;
  top: 109px;
  // width: calc(100% - 366px);
  height: 1288.58px;
  //border: 4px solid #384054;
  box-sizing: border-box;
  border-radius: 0 58px 58px 0;
  color: #fff;
  //background-image: url("../../assets/images/view/car_bg2.png");
  background-size: 100% 100%;

}

.active {
  background: #495066;
}

.border-radius1 {
  border-radius: 57px;
}

.border-radius2 {
  border-radius: 57px 0 0 57px;
}
</style>
